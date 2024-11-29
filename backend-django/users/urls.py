from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentProfileViewSet, AlumnusProfileViewSet, CollegeStaffProfileViewSet, CollegeViewSet,
    SignupView, ProfileSetupView, CreateCollegeView, UserProfileViewSet
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Initialize the router
router = DefaultRouter()
router.register(r'student-profiles', StudentProfileViewSet, basename='student-profile')
router.register(r'alumnus-profiles', AlumnusProfileViewSet, basename='alumnus-profile')
router.register(r'college-staff-profiles', CollegeStaffProfileViewSet, basename='college-staff-profile')
router.register(r'colleges', CollegeViewSet, basename='college')
router.register(r'userprofiles' ,UserProfileViewSet, basename='userprofile')

urlpatterns = [
    path('', include(router.urls)),  # This will include the generated routes
    path('signup/', SignupView.as_view(), name='signup'),
    path('profile-setup/', ProfileSetupView.as_view(), name='profile-setup'),  # Profile setup route
    path('create-college/', CreateCollegeView.as_view(), name='create-college'),  # Create college route
    # JWT token routes
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
