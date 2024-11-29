from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.db import transaction
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
import requests
from .models import User
import string
import secrets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, CollegeAdminProfile
from .serializers import UserSerializer, CollegeSerializer, UserProfileSerializer, CollegeAdminProfileSerializer, StudentProfileSerializer, AlumnusProfileSerializer, CollegeStaffProfileSerializer,UserRegistrationSerializer
from rest_framework import permissions
from .permissions import *

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
            print(user)
            # Return the JWT tokens and user details
            return Response({
                'status': 'success',
                'message': 'User created successfully',
                'refresh': str(refresh),
                'access': str(access_token),
                'user': {
                    'id': user.id,
                    'role':user.role,
                    'email': user.email,
                    'username': user.username,
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    """
    Normal authentication view to login with email/username and password.
    Returns JWT access and refresh tokens if credentials are valid.
    """

    def post(self, request):
        # Extract email/username and password from the request data
        identifier = request.data.get("email") or request.data.get("username")
        password = request.data.get("password")

        if not identifier or not password:
            return Response(
                {"detail": "Email/username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the identifier is an email or username and find the user
        try:
            # Try to find the user by email if the identifier looks like an email
            if "@" in identifier:
                user = User.objects.get(email=identifier)
            else:
                user = User.objects.get(username=identifier)
        except User.DoesNotExist:
            # If the user does not exist, return an error message
            raise AuthenticationFailed("No user found with the provided email/username.")

        # Check if the password is correct
        if not user.check_password(password):
            return Response(
                {"detail": "Invalid email/username or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Generate JWT tokens (access and refresh)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Return the tokens and user information
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
                    "role":user.role,
                },
            },
            status=status.HTTP_200_OK,
        )

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Default queryset to fetch all users
    serializer_class = UserSerializer
     
# College Admin ViewSet
class CollegeAdminViewSet(viewsets.ModelViewSet):
    queryset = CollegeAdminProfile.objects.all()
    serializer_class = CollegeAdminProfileSerializer
    
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


# Google Authentication View
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
                        "username": user.username,
                        "role":user.role,
                    },
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
