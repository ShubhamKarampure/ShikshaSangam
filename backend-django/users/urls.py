from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import StudentProfileViewSet, AlumnusProfileViewSet, CollegeStaffProfileViewSet, CollegeViewSet 
from .views import SignupView

# Initialize the router

router = DefaultRouter()
router.register(r'student-profiles', StudentProfileViewSet, basename='student-profile')
router.register(r'alumnus-profiles', AlumnusProfileViewSet, basename='alumnus-profile')
router.register(r'college-admin-profiles', CollegeStaffProfileViewSet, basename='college-admin-profile')
router.register(r'colleges', CollegeViewSet, basename='college')

urlpatterns = [
    path('', include(router.urls)),  # This will include the generated routes
    path('signup/', SignupView.as_view() )
]

