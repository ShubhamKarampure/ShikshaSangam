from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import StudentProfileViewSet, AlumnusProfileViewSet, CollegeAdminProfileViewSet, CollegeViewSet

# Initialize the router
router = DefaultRouter()
router.register(r'users', UserViewSet)  # Registers the UserViewSet
router.register(r'student-profiles', StudentProfileViewSet, basename='student-profile')
router.register(r'alumnus-profiles', AlumnusProfileViewSet, basename='alumnus-profile')
router.register(r'college-admin-profiles', CollegeAdminProfileViewSet, basename='college-admin-profile')
router.register(r'colleges', CollegeViewSet, basename='college')

urlpatterns = [
    path('', include(router.urls)),  # This will include the generated routes
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    # JWT Token Endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]