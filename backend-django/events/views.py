from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets,status
from django.utils.timezone import now

from .models import Event, EventRegistration, EventFAQ, EventLike
from .serializers import EventSerializer, OrganiserEventSerializer, EventFAQSerializer,EventRegistrationSerializer, EventListSerializer, EventLikeSerializer
from rest_framework.pagination import PageNumberPagination
class EventPagination(PageNumberPagination):
    page_size = 16  # Assumong 4x4 grid.,
    page_size_query_param = 'page_size'
    max_page_size = 100


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    @action(detail=False, methods=['get'])
    def list_events(self, request):
        """View for the Events Page: Fetch all events with organiser details."""
        events = self.get_queryset()
        serializer = EventListSerializer(events, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get']) # /events/<id>/details/
    def event_details(self, request, pk=None):
        """View for Single Event Page: Fetch event, organiser, speakers, and FAQs."""
        event = self.get_object()
        serializer = self.get_serializer(event)
       
        return Response(serializer.data)

    @action(detail=True, methods=['get']) # /events/<id>/organiser/
    def organiser_view(self, request, pk=None):
        """View for Organiser: List of participants and total amount collected."""
        event = self.get_object()
        serializer = OrganiserEventSerializer(event)
        # count = len(serializer.data['participants'])
        # serializer.data['no_of_registrations'] = count
        return Response(serializer.data)

class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer

class EventLikeViewSet(viewsets.ModelViewSet):
    queryset = EventLike.objects.all()
    serializer_class = EventLikeSerializer
    # Custom action to "unlike" an event
    @action(detail=False, methods=['delete'])
    def unlike(self, request):
        event_id = request.data.get('event')  # Get event_id from the request body
        
        if not event_id:
            return Response({"detail": "Event ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({"detail": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

        # Get the userprofile of the current user
        userprofile = request.user.user

        # Try to find the existing like for this user and event
        event_like = EventLike.objects.filter(userprofile=userprofile, event=event).first()
        
        if not event_like:
            return Response({"detail": "You have not liked this event."}, status=status.HTTP_400_BAD_REQUEST)

        # If the like exists, delete it (unlike)
        event_like.delete()

        return Response({"detail": "Like removed successfully."}, status=status.HTTP_204_NO_CONTENT)

class EventFAQViewSet(viewsets.ModelViewSet):
    queryset = EventFAQ.objects.all()
    serializer_class = EventFAQSerializer
