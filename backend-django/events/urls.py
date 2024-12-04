from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import EventViewSet, EventRegistrationViewSet, EventFAQViewSet, EventLikeViewSet

router = DefaultRouter()
router.register('events', EventViewSet, basename='event')
router.register('registrations', EventRegistrationViewSet, basename='registration')
router.register('faqs', EventFAQViewSet, basename='faq')
router.register('likes', EventLikeViewSet, basename='like')

urlpatterns = [
    path('', include(router.urls)),
    path('events/<int:pk>/details/', EventViewSet.as_view({'get': 'event_details'})),
    path('events/<int:pk>/organiser/', EventViewSet.as_view({'get': 'organiser_view'})),
]
