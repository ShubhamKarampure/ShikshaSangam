from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CollegeViewSet,
    UserProfileViewSet,
    StudentProfileViewSet,
    AlumnusProfileViewSet,
    CollegeStaffProfileViewSet
)

router = DefaultRouter()
router.register(r'colleges', CollegeViewSet)
router.register(r'user-profiles', UserProfileViewSet)
router.register(r'student-profiles', StudentProfileViewSet)
router.register(r'alumnus-profiles', AlumnusProfileViewSet)
router.register(r'college-staff-profiles', CollegeStaffProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
