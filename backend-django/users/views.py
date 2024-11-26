from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile,CollegeAdminProfile
from .serializers import (
    CollegeSerializer, UserProfileSerializer, CollegeAdminProfileSerializer,
    StudentProfileSerializer, AlumnusProfileSerializer, CollegeStaffProfileSerializer
)
from django.contrib.auth.models import User
from .permissions import *


class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer

    def get_permissions(self):
        if self.action == 'create':
            # Only College Admins can create a college
            permission_classes = [IsCollegeAdmin]
        elif self.action in ['retrieve', 'list']:
            # College Admins, Staff, and Verified Users can view college info
           permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            # Only College Admins can update college details
            permission_classes = [IsCollegeAdmin, IsAuthenticated]
        elif self.action == 'destroy':
            # Only College Admins can delete a college
            permission_classes = [IsCollegeAdmin, IsAuthenticated]
        return [permission() for permission in permission_classes]

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_permissions(self):
        if self.action == 'create':
            # Any verified user can create a UserProfile
             permission_classes = [] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
            # Any verified user can view UserProfiles
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            # Only the owner of the profile can update their profile
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            # Only the owner of the profile can delete their profile
            permission_classes = [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        return [permission() for permission in permission_classes]

class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission | IsCollegeAdmin , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]
        

class AlumnusProfileViewSet(viewsets.ModelViewSet):
    queryset = AlumnusProfile.objects.all()
    serializer_class = AlumnusProfileSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission | IsCollegeAdmin , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]

class CollegeStaffProfileViewSet(viewsets.ModelViewSet):
    queryset = CollegeStaffProfile.objects.all()
    serializer_class = CollegeStaffProfileSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]

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