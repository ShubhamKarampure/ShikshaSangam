from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction

from rest_framework import permissions, status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    User,
    College,
    UserProfile,
    StudentProfile,
    AlumnusProfile,
    CollegeStaffProfile,
    CollegeAdminProfile,
)
from .serializers import (
    UserSerializer,
    CollegeSerializer,
    UserProfileSerializer,
    CollegeAdminProfileSerializer,
    StudentProfileSerializer,
    AlumnusProfileSerializer,
    CollegeStaffProfileSerializer,
    UserRegistrationSerializer,
)

import requests
import string
import secrets

class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        # Serialize the incoming data
        serializer = UserRegistrationSerializer(data=request.data)
        
        # Validate and create the user
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
         
            # Return the JWT tokens and user details
            user_profile_id = None
        try:
            # user_profile = user.user  # Accessing the related UserProfile (But how does it get created for new user?)
            # user_profile_id = user_profile.id
            pass
        except ObjectDoesNotExist:
            # Profile does not exist
            pass
            return Response({
                'status': 'success',
                'message': 'User created successfully',
                'refresh': str(refresh),
                'access': str(access_token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                    "profile_id": user_profile_id,
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Print the incoming request data
        print("Incoming Request Data (UserLoginView):", request.data)

        identifier = request.data.get("email") or request.data.get("username")
        password = request.data.get("password")

        if not identifier or not password:
            return Response(
                {"detail": "Email/username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            if "@" in identifier:
                user = User.objects.get(email=identifier)
            else:
                user = User.objects.get(username=identifier)
        except User.DoesNotExist:
            raise AuthenticationFailed("No user found with the provided email/username.")

        if not user.check_password(password):
            return Response(
                {"detail": "Invalid email/username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user_profile_id = None
        try:
            user_profile = user.user
            user_profile_id = user_profile.id
        except ObjectDoesNotExist:
            pass

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        profile = None
        role = None
        try:
            profile = UserProfile.objects.filter(id=user_profile_id)
            role = profile[0].role
        except:
            pass

        return Response(
            {
                "status": "success",
                "message": "Login successful",
                "access": access_token,
                "refresh": refresh_token,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "profile_id": user_profile_id,
                    "role": role,
                },
            },
            status=status.HTTP_200_OK,
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
                    
            # Step 5: Try to get the user's profile ID if it exists
            user_profile_id = None
            try:
                user_profile = user.user  # Accessing the related UserProfile
                user_profile_id = user_profile.id
                print(user_profile_id)
            except ObjectDoesNotExist:
                # Profile does not exist
                pass

            # Step 6: Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            profile = None
            try:
                profile=UserProfile.objects.filter(id=user_profile_id)
                profile=profile[0]
            except:
                pass
            # print(profile[0].role)
            role=None
            if profile:
                print(profile.role)
                role=profile.role
            # Step 7: Return the access, refresh, and user details (including profile ID if exists)
            return Response(
                {
                    "status": "success",
                    "message": "Login successful",
                    "access": access_token,
                    "refresh": refresh_token,
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "username": user.username,
                        "profile_id": user_profile_id,  
                        "role": role
                    }
                },
                status=status.HTTP_200_OK,
            )

        except requests.exceptions.RequestException:
            return Response(
                {"detail": "Failed to verify token with Google"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        except AuthenticationFailed as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    def generate_random_password(self):
        """Generate a cryptographically secure random password."""
        length = 12
        characters = string.ascii_letters + string.digits + "!@#$%^&*()_+-=[]{}|;:,.<>?"
        return ''.join(secrets.choice(characters) for _ in range(length))

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Default queryset to fetch all users
    serializer_class = UserSerializer
    

class UserProfileViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    # def get_permissions(self):
    #     if self.action == 'create':
    #         # Any verified user can create a UserProfile
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
    #         # Any verified user can view UserProfiles
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
    #         # Only the owner of the profile can update their profile
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
    #         # Only the owner of the profile can delete their profile
    #         permission_classes = [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     return [permission() for permission in permission_classes]

# College ViewSet
class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    # def get_permissions(self):
    #     if self.action == 'create':
    #         # Only College Admins can create a college
    #         permission_classes = [IsCollegeAdmin]
    #     elif self.action in ['retrieve', 'list']:
    #         # College Admins, Staff, and Verified Users can view college info
    #        permission_classes = [IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
    #         # Only College Admins can update college details
    #         permission_classes = [IsCollegeAdmin, IsAuthenticated]
    #     elif self.action == 'destroy':
    #         # Only College Admins can delete a college
    #         permission_classes = [IsCollegeAdmin, IsAuthenticated]
    #     return [permission() for permission in permission_classes]

# College Admin ViewSet
class CollegeAdminViewSet(viewsets.ModelViewSet):
    queryset = CollegeAdminProfile.objects.all()
    serializer_class = CollegeAdminProfileSerializer

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    # def get_permissions(self):
    #     if self.action == 'create':
            
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
           
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
            
    #         permission_classes= [IsOwnerPermission | IsCollegeAdmin , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
            
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]
        


class AlumnusProfileViewSet(viewsets.ModelViewSet):
    queryset = AlumnusProfile.objects.all()
    serializer_class = AlumnusProfileSerializer
    # def get_permissions(self):
    #     if self.action == 'create':
            
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
           
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
            
    #         permission_classes= [IsOwnerPermission | IsCollegeAdmin , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
            
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]

class CollegeStaffProfileViewSet(viewsets.ModelViewSet):
    queryset = CollegeStaffProfile.objects.all()
    serializer_class = CollegeStaffProfileSerializer

    # def get_permissions(self):
    #     if self.action == 'create':
            
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
           
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
            
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
            
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]
