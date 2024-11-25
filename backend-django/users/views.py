from rest_framework import viewsets
from .models import College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile
from .serializers import (
    CollegeSerializer, UserProfileSerializer, 
    StudentProfileSerializer, AlumnusProfileSerializer, CollegeStaffProfileSerializer
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User




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