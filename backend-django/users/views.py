from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from datetime import timedelta, datetime
from django.utils.timezone import now
from django.db.models import Count
from rest_framework.decorators import action

from rest_framework import permissions, status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404

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
    UserProfileOnlySerializer
)
from rest_framework.decorators import action
import requests
import string
import secrets
from django.http import JsonResponse
from django.core import serializers

class UserRegistrationView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        # Serialize the incoming data
        print(f"{request.data}")
        serializer = UserRegistrationSerializer(data=request.data)
        
        # Validate and create the user
        if serializer.is_valid():
            print('serializer is valid')
            user = serializer.save()
            
            # Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token
         
            # Return the JWT tokens and user details
            user_profile_id = None

            print(f'accesss = {access_token}')
        else:
            print(serializer.errors)
        try:
            user_profile = user.user  # Accessing the related UserProfile (But how does it get created for new user?)
            user_profile_id = user_profile.id
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
        user_profile = None
        try:
            profile = UserProfile.objects.filter(id=user_profile_id)
            role = profile[0].role
            user_profile.status = 'online'
            user_profile.save()  
        except:
            pass
        userStatus=  user_profile.status if user_profile else None
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
                    "status":userStatus,
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
                print("Creating new user")
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
            user_profile = None
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
                user_profile.status = 'online'
                user_profile.save()  
            except:
                pass
            # print(profile[0].role)
            role=None
            if profile:
                print(profile.role)
                role=profile.role
            # Step 7: Return the access, refresh, and user details (including profile ID if exists)
            userStatus=  user_profile.status if user_profile else None
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
                        "status": userStatus
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

class UserLogoutView(APIView):
    def post(self, request):
        try:
            # Get the current user's profile
            user_profile = request.user.user
            user_profile.status = 'offline'  # Set status to offline
            user_profile.save()

            # Print the user_profile to debug
            print(f"User profile after logout: {user_profile}")
            print(f"User status: {user_profile.status}")  # Print the updated status

            return Response({"status": "success", "message": "Logged out successfully."}, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"status": "success", "message": "Logged out successfully."}, status=status.HTTP_200_OK)
            # return Response({"detail": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Default queryset to fetch all users
    serializer_class = UserSerializer
    

class UserProfileViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileOnlySerializer
    
    @action(detail=False,methods=['get'])
    def college_users(self,request):
        user_college=request.user.user.college
        college_user=UserProfile.objects.filter(college=user_college)[:5]
        serializer = UserProfileSerializer(college_user, many=True)
        for data in serializer.data:
            data['email'] = User.objects.get(id=data['user']).email
            if(data['role']=='student'):
                try:
                    student = StudentProfile.objects.get(profile=data['id'])
                except StudentProfile.DoesNotExist:
                    data['year']="2026"
                    continue
                data['year']=student.expected_graduation_year
            elif(data['role']=='alumni'):
                try:
                    alumnus=AlumnusProfile.objects.get(profile=data['id'])
                except AlumnusProfile.DoesNotExist:
                    data['year']="2026"
                    continue
                data['year']=alumnus.graduation_year
            
        return Response(serializer.data)
        # return Response(college_user)
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

    # @action(detail=True, methods=['get'], url_path='profiles-per-day')
    # def profiles_per_day(self, request, pk=None):
    #     """
    #     Returns the number of profiles created per day for the last `n` days (including today).
    #     """
    #     try:
    #         # Parse `n` from query parameters (default is 7 days)
    #         n_days = int(request.query_params.get('days', 7))
    #         end_date = now().date()
    #         start_date = end_date - timedelta(days=n_days - 1)

    #         # Filter profiles by college and creation date
    #         profiles = UserProfile.objects.filter(
    #             college_id=pk,  # Filter by college
    #             created_at__date__range=(start_date, end_date)
    #         )

    #         # Aggregate count per day
    #         profiles_per_day = (
    #             profiles
    #             .annotate(date=models.functions.TruncDate('created_at'))
    #             .values('date')
    #             .annotate(count=Count('id'))
    #             .order_by('date')
    #         )

    #         # Build response dictionary
    #         date_range = [
    #             (start_date + timedelta(days=i)).isoformat()
    #             for i in range(n_days)
    #         ]
    #         profile_counts = {entry['date'].isoformat(): entry['count'] for entry in profiles_per_day}
    #         results = {date: profile_counts.get(date, 0) for date in date_range}

    #         return Response({'results': results}, status=200)

    #     except Exception as e:
    #         return Response({'error': str(e)}, status=500)
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
    @action(detail=False, methods=["get"])
    def college_statistics(self, request):
        # Get the college of the current user
        user_college = request.user.user.college

        if not user_college:
            return Response(
                {"error": "User is not associated with any college."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Count users, students, and alumni
        total_users = UserProfile.objects.filter(college=user_college).count()
        total_students = StudentProfile.objects.filter(profile__college=user_college).count()
        total_alumni = AlumnusProfile.objects.filter(profile__college=user_college).count()

        # Prepare and return the response
        data = {
            "college": user_college.college_name,
            "total_users": total_users,
            "total_students": total_students,
            "total_alumni": total_alumni,
        }
        return Response(data, status=status.HTTP_200_OK)
    

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
    @action(detail=False,methods=['get'])
    def college_users(self, request):
        # Get the user's college
        user_college = request.user.user.college

        # Filter UserProfiles by the college
        college_user_profiles = UserProfile.objects.filter(college=user_college)

        # Get the associated StudentProfiles
        students = []
        for user_profile in college_user_profiles:
            try:
                student = StudentProfile.objects.get(profile=user_profile)
                student_data=StudentProfileSerializer(student).data
                student_data['name']=user_profile.full_name
                student_data['email']=user_profile.user.email
                students.append(student_data)
            except StudentProfile.DoesNotExist:
                continue  # Skip if there's no student profile for this user profile


        return Response(students, status=status.HTTP_200_OK)


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
    @action(detail=False,methods=['get'])
    def college_users(self, request):
        user_college = request.user.user.college
        college_user_profiles = UserProfile.objects.filter(college=user_college)

        alumnis = []
        for user_profile in college_user_profiles:
            try:
                alumni = AlumnusProfile.objects.get(profile=user_profile)
                alumni_data = AlumnusProfileSerializer(alumni).data  # Serialize AlumnusProfile
                alumni_data['name'] = user_profile.full_name  # Add full name
                alumni_data['email'] = user_profile.user.email  # Add email from User
                alumnis.append(alumni_data)
            except AlumnusProfile.DoesNotExist:
                continue  


        return Response(alumnis, status=status.HTTP_200_OK)

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
