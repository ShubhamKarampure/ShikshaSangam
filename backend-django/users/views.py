from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed
from django.db import transaction
from django.conf import settings
import requests
from django.contrib.auth.models import User
import string
import secrets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, CollegeAdminProfile
from .serializers import CollegeSerializer, UserProfileSerializer, CollegeAdminProfileSerializer, StudentProfileSerializer, AlumnusProfileSerializer, CollegeStaffProfileSerializer

# College Admin ViewSet
class CollegeAdminViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeAdminProfileSerializer
    
# College ViewSet
class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    
# UserProfile ViewSet
class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    parser_classes = (MultiPartParser, FormParser)
    
# StudentProfile ViewSet
class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    
# AlumnusProfile ViewSet
class AlumnusProfileViewSet(viewsets.ModelViewSet):
    queryset = AlumnusProfile.objects.all()
    serializer_class = AlumnusProfileSerializer
    
# CollegeStaffProfile ViewSet
class CollegeStaffProfileViewSet(viewsets.ModelViewSet):
    queryset = CollegeStaffProfile.objects.all()
    serializer_class = CollegeStaffProfileSerializer
    
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
