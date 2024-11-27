from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    StudentProfileViewSet, AlumnusProfileViewSet, CollegeStaffProfileViewSet, CollegeViewSet,CollegeAdminViewSet,
    GoogleAuthView
)

# Initialize the router
router = DefaultRouter()
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
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration
    
    
    # JWT token routes for authentication
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Google authentication route
    path('google-auth/', GoogleAuthView.as_view(), name='google_auth'),
]
