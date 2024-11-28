from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    StudentProfileViewSet, AlumnusProfileViewSet, CollegeStaffProfileViewSet, CollegeViewSet,CollegeAdminViewSet,
    GoogleAuthView,UserRegistrationView,UserLoginView,UserViewSet, UserProfileViewSet
)

# Initialize the router
router = DefaultRouter()
router.register(r'account', UserViewSet,basename='user')
router.register(r'user-profile', UserProfileViewSet,basename='user-profile')
router.register(r'student-profiles', StudentProfileViewSet, basename='student-profile')
router.register(r'alumnus-profiles', AlumnusProfileViewSet, basename='alumnus-profile')
router.register(r'college-staff-profiles', CollegeStaffProfileViewSet, basename='college-staff-profile')
router.register(r'colleges', CollegeViewSet, basename='college')
router.register(r'college-admin', CollegeAdminViewSet, basename='college-admin')

urlpatterns = [
    # Include the generated routes from the router
    path('', include(router.urls)),
    
    # Signup and profile setup routes
    #Oauth
    path('auth/', include('dj_rest_auth.urls')),  # Login, logout, password reset
    path('auth/register/', UserRegistrationView.as_view(), name='register'),
    path('auth/login/token', UserLoginView.as_view(), name='login'),

    # JWT token routes for authentication
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Google authentication route
    path('auth/google-auth/', GoogleAuthView.as_view(), name='google_auth'),
]
