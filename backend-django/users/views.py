from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from rest_framework import viewsets, permissions
from .models import StudentProfile, AlumnusProfile, CollegeAdminProfile, College
from .serializers import (
    StudentProfileSerializer,
    AlumnusProfileSerializer,
    CollegeAdminProfileSerializer,
    CollegeSerializer,
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        try:
            user = serializer.save()
            print(f"User {user.username} created successfully.")  
            return Response({
                'user': user.username,
            }, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            print(f"Validation error: {str(e)}")  
            return Response({'detail': 'An account with this credentials already exists '}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(f"Error occurred: {str(e)}")  
            return Response({'detail': 'An error occurred during registration.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'college_admin':
            return StudentProfile.objects.filter(college=self.request.user.college_admin_profile.managed_college)
        return super().get_queryset()


class AlumnusProfileViewSet(viewsets.ModelViewSet):
    queryset = AlumnusProfile.objects.all()
    serializer_class = AlumnusProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class CollegeAdminProfileViewSet(viewsets.ModelViewSet):
    queryset = CollegeAdminProfile.objects.all()
    serializer_class = CollegeAdminProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class CollegeViewSet(viewsets.ModelViewSet):
    queryset = College.objects.all()
    serializer_class = CollegeSerializer
    permission_classes = [permissions.IsAuthenticated]

