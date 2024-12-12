from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets,status
from django.utils.timezone import now

from .models import Event, EventRegistration, EventFAQ, EventLike
from .serializers import EventSerializer, OrganiserEventSerializer, EventFAQSerializer,EventRegistrationSerializer, EventListSerializer, EventLikeSerializer
from rest_framework.pagination import PageNumberPagination
from social.models import Follow
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
class EventPagination(PageNumberPagination):
    page_size = 16  # Assumong 4x4 grid.,
    page_size_query_param = 'page_size'
    max_page_size = 100


def get_user_profiles_by_emails(email_list):
    """
    Convert a list of emails to corresponding UserProfile objects.
    Args:
        email_list (list): List of emails.
    Returns:
        list: List of UserProfile objects for valid emails.
        list: List of emails that didn't match any UserProfile.
    """
    user_profiles = []
    invalid_emails = []

    for email in email_list:
        try:
            user = User.objects.get(email=email)
            user_profiles.append(user.user.id)  # Accessing the related UserProfile
        except ObjectDoesNotExist:
            invalid_emails.append(email)
    
    return user_profiles, invalid_emails

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class  = EventPagination

    @action(detail=False, methods=['post'])
    def create_with_emails(self, request):
        emails = request.data.pop('speaker_emails')

        profile_ids, _ = get_user_profiles_by_emails(emails)

        request.data['speaker_profiles'] = profile_ids

         # Serialize and save the Event
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save()

            # Return the created event and invalid emails
            return Response({
                "event": EventSerializer(event).data,
                "invalid_emails": invalid_emails
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        

    @action(detail=False, methods=['get'])
    def list_events(self, request):
        """View for the Events Page: Fetch all events with organiser details."""
        events = self.get_queryset()
        page = self.paginate_queryset(events)
        if page is not None:
            return self._get_paginated_event_data(page)
        return Response({"detail": "No event available."})
    
    @action(detail=False, methods=['get'])
    def college_events(self, request):
        """View for the Events Page: Fetch all events with organiser details."""
        print(request.user.user.college)
        events = Event.objects.filter(created_by__college = request.user.user.college)
        print(events)
        page = self.paginate_queryset(events)
        if page is not None:
            return self._get_paginated_event_data(page)
        return Response({"detail": "No event available."})
    


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
    
    def _get_paginated_event_data(self, events):
        """Helper function to format paginated event data."""
        response_data = []
        # post_content_type = ContentType.objects.get_for_model(Post)

        for event in events:
            user = event.created_by 
            num_followers = Follow.objects.filter(followed=user).count()
            # num_likes = EventLike.objects.filter(event= event).count()
            # num_comments = EventFAQ.objects.filter(event=event).count()
            # num_shares = Share.objects.filter(post=post).count()
            # time_since_post = timesince(post.created_at)

            event_serializer = EventListSerializer(event)
            user_dict = {}
            if user:
                user_dict = {
                    'user': {
                        'username': user.user.username,
                        'profile_id': user.id,
                        'avatar':user.avatar_image.url if user.avatar_image else None,
                        'num_followers': num_followers,
                        'bio': user.bio
                    }
                }  
            response_data.append({
                'event': event_serializer.data,  
            })
            if user:
                response_data.append(user_dict)

        return self.get_paginated_response(response_data)

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
