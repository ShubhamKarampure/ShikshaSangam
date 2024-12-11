from rest_framework.routers import DefaultRouter
from .views import JobViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')

urlpatterns = [
    # Other URLs
] + router.urls