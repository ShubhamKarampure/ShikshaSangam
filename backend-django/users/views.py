from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.db import transaction
from django.conf import settings
import requests
import string
import secrets
from rest_framework import viewsets

from .models import College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, CollegeAdminProfile
from .serializers import (
    CollegeSerializer,
    UserProfileSerializer,
    CollegeAdminProfileSerializer,
    StudentProfileSerializer,
    AlumnusProfileSerializer,
    CollegeStaffProfileSerializer
)
  

class GoogleAuthView(APIView):
    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response(
                {"detail": "Token is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Step 1: Verify the JWT Token with Google's OAuth2 API
            response = requests.get(
                "https://www.googleapis.com/oauth2/v3/tokeninfo",
                params={"id_token": token},
            )
            google_data = response.json()

            # Check response status and data validity
            if response.status_code != 200 or "error" in google_data:
                raise AuthenticationFailed("Invalid or expired token")

            # Step 2: Check if the token is intended for this app
            if google_data.get("aud") != settings.GOOGLE_OAUTH_CLIENT_ID:
                raise AuthenticationFailed("Token is not from a valid source")

            # Step 3: Extract user data from the token
            email = google_data.get("email")
            first_name = google_data.get("given_name", "")
            last_name = google_data.get("family_name", "")
            picture = google_data.get("picture", "")
            username = f"{first_name}{last_name}".replace(" ", "").lower()

            if not email:
                raise AuthenticationFailed("Email is required")

            # Step 4: Check if the user exists or create a new user
            user = User.objects.filter(email=email).first()
            if not user:
                with transaction.atomic():
                    user = User.objects.create_user(
                        email=email,
                        username=username,
                        first_name=first_name,
                        last_name=last_name,
                        password=self.generate_random_password(),
                    )
                    
            # Step 5: Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            # Step 6: Return the access, refresh, and user details
            return Response(
                {
                    "status": "success",
                    "message": "Login successful",
                    "access": access_token,
                    "refresh": refresh_token,
                    "user": {
                        "id": user.id,
                        "email": user.email,
                    },
                },
                status=status.HTTP_200_OK,
            )

        except requests.exceptions.RequestException:
            return Response(
                {"detail": "Failed to verify token with Google"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def generate_random_password(self):
        """Generate a cryptographically secure random password."""
        length = 12
        characters = string.ascii_letters + string.digits + "!@#$%^&*()_+-=[]{}|;:,.<>?"
        return ''.join(secrets.choice(characters) for _ in range(length))
        
class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer

class AlumnusProfileViewSet(viewsets.ModelViewSet):
    queryset = AlumnusProfile.objects.all()
    serializer_class = AlumnusProfileSerializer

class CollegeStaffProfileViewSet(viewsets.ModelViewSet):
    queryset = CollegeStaffProfile.objects.all()
    serializer_class = CollegeStaffProfileSerializer

class ProfileSetupView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user  # Get the logged-in user
        if not user.is_authenticated:
            return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        # Handle admin profile creation
        if user.role == 'admin':
            return self._create_admin_profile(user)

        # Step 1: Create the UserProfile
        user_profile = self._create_user_profile(request, user)

        # Step 2: Handle Role-Specific Profiles
        role = request.data.get('role')
        if role not in ['student', 'alumnus', 'staff']:
            return Response({"detail": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)

        return self._create_role_profile(role, user_profile, request)

    def _create_admin_profile(self, user):
        serializer = CollegeAdminProfileSerializer(data={'user': user.id, 'is_verified': False})
        if serializer.is_valid():
            serializer.save()  # Save the CollegeAdminProfile
            return Response({"detail": "Admin profile created. Awaiting verification."}, status=status.HTTP_201_CREATED)

    def _create_user_profile(self, request, user):
        user_profile_data = request.data.get('user_profile', {})
        user_profile_data['user'] = user.id  # Link profile to the logged-in user
        user_profile_serializer = UserProfileSerializer(data=user_profile_data)
        if user_profile_serializer.is_valid():
            return user_profile_serializer.save()
        else:
            return Response(user_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _create_role_profile(self, role, user_profile, request):
        role_data = request.data.get('role_profile', {})
        role_data['profile'] = user_profile.id

        # Select appropriate serializer based on role
        role_serializers = {
            'student': StudentProfileSerializer,
            'alumnus': AlumnusProfileSerializer,
            'staff': CollegeStaffProfileSerializer,
        }

        serializer_class = role_serializers.get(role)
        if serializer_class:
            serializer = serializer_class(data=role_data)
            if serializer.is_valid():
                serializer.save()
                return Response({"detail": "Profile created successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)


class CreateCollegeView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user  # Get the logged-in user
        if not user.is_authenticated:
            return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Check if user is an admin
        if user.role != 'admin':
            return Response({"detail": "Only admins can create a college"}, status=status.HTTP_403_FORBIDDEN)

        # Check if admin profile exists and is verified
        try:
            admin_profile = CollegeAdminProfile.objects.get(user=user)
        except CollegeAdminProfile.DoesNotExist:
            return Response({"detail": "Admin profile not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if not admin_profile.is_verified:
            return Response({"detail": "Admin profile is not verified"}, status=status.HTTP_400_BAD_REQUEST)

        # If admin is verified, proceed to create the College
        college_data = request.data.get('college', {})
        college_serializer = CollegeSerializer(data=college_data)

        if college_serializer.is_valid():
            college_serializer.save()  # Save the college
            return Response(college_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(college_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignupView(APIView):
    def post(self, request, *args, **kwargs):
        # Step 1: Create the User (Django default user or custom user model)
        role = request.data.get('role') 
        user_profile_data = request.data.get('user_profile')
            
        full_name = user_profile_data.get('full_name', '')

        # Split the full_name into first and last names
        
        user_data = request.data.get('user')
        
        if full_name:
            name_parts = full_name.strip().split(' ', 1)  # Split by the first space
            first_name = name_parts[0]  # First part is the first name
            last_name = name_parts[1] if len(name_parts) > 1 else ''  # Remainder is the last name
        else:
            first_name=''
            last_name=''
        
        username = user_data.get('username')
        password = user_data.get('password')
        email = user_data.get('email')

        if not username or not password:
            return Response({"detail": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)


        
        if role == 'staff':
            user = User.objects.create_user(username=user_data['username'], password=user_data['password'], email=email, is_staff=True, first_name=first_name,last_name=last_name)
        else:
            user = User.objects.create_user(username=user_data['username'], password=user_data['password'],first_name=first_name, last_name=last_name, email=email)
        
        # Step 2: Create the UserProfile
        # user_profile_data = request.data.get('user_profile')
        user_profile_data['college'] = user_profile_data.get('college_id')  # You can manage this association here
        user_profile_data['user'] = user  # Link the profile to the user
        
        user_profile_serializer = UserProfileSerializer(data=user_profile_data)
        if user_profile_serializer.is_valid():
            user_profile = user_profile_serializer.save()
        else:
            return Response(user_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Step 3: Create the Role-based Profile (Student, Alumnus, or CollegeStaff)
        role = request.data.get('role')  # role will be 'student', 'alumnus', or 'staff'
        
        role_based_profile_data = request.data.get('role_profile')  # data specific to each role
        role_based_profile_data['profile'] = user_profile.id  # Link the role-based profile to the user profile

        if role == 'student':
            role_based_profile_serializer = StudentProfileSerializer(data=role_based_profile_data)
            if role_based_profile_serializer.is_valid():
                role_based_profile_serializer.save()
            else:
                return Response(role_based_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif role == 'alumnus':
            role_based_profile_serializer = AlumnusProfileSerializer(data=role_based_profile_data)
            if role_based_profile_serializer.is_valid():
                role_based_profile_serializer.save()
            else:
                return Response(role_based_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif role == 'staff':
            role_based_profile_serializer = CollegeStaffProfileSerializer(data=role_based_profile_data)
            if role_based_profile_serializer.is_valid():
                role_based_profile_serializer.save()
            else:
                return Response(role_based_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"detail": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)

        # Step 4: Return Success Response
        return Response({
            "detail": "User created successfully",
            "user_id": user.id,
            "role": role
        }, status=status.HTTP_201_CREATED)
    


'''
REQUEST TEMPLATE FOR SIGNUP_VIEW 
url - /users/signup/

{
  "user": {
    "username": "john_doe",
    "password": "password123",
    "email":"john_doe@email.com"
  },
  "user_profile": {
    "college_id": 1,  # Existing College ID
    "full_name": "John Doe",
    "bio": "A student at XYZ College",
    "contact_number": "1234567890"
  },
  "role": "student",  # Can be 'student', 'alumnus', or 'staff'
  "role_profile": {
    "enrollment_year": 2023,
    "current_program": "Computer Science",
    "expected_graduation_year": 2027
  }
}

role_profile for alum = 
{
"graduation_year":2022,

}

role_profile for college staff = 
{
"position":"faculty"
}

'''