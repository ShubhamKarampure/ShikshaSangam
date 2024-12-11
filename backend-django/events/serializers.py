from rest_framework import serializers
from .models import Event, EventRegistration, EventFAQ, EventLike
from users.models import UserProfile
from django.utils import timezone

class EventUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'full_name', 'avatar_image']  # Include relevant fields

class EventLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventLike
        fields = '__all__' # Include relevant fields


class EventFAQSerializer(serializers.ModelSerializer):
   # created_by = EventUserProfileSerializer(read_only=True)  # Include creator details

    class Meta:
        model = EventFAQ
        fields = ['id', 'question', 'answer', 'created_by', 'created_at','event']


class EventRegistrationSerializer(serializers.ModelSerializer):
    #userprofile = EventUserProfileSerializer(read_only=True)  # Include attendee details

    class Meta:
        model = EventRegistration
        fields = ['id', 'userprofile', 'registered_at','event']

class EventSerializer(serializers.ModelSerializer):
    # created_by = EventUserProfileSerializer(read_only=True)  # Organiser details
    # speaker_profiles = EventUserProfileSerializer(read_only=True, many=True)  # Linked speakers
    faqs = EventFAQSerializer(read_only=True, many=True)
    likes_count = serializers.SerializerMethodField()
    registrations_count = serializers.SerializerMethodField()
    time_to_event = serializers.SerializerMethodField()
    time_to_registration_deadline = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'name', 'poster', 'date_time', 'mode', 'location', 'organising_committee', 
            'type', 'organiser_contacts', 'prizes', 'registration_fee', 'description', 
            'summary', 'event_plan', 'speaker_profiles', 'speakers', 'tags', 
            'created_by', 'created_at', 'updated_at', 'online_meet_id', 
            'likes_count', 'registrations_count', 'time_to_event', 'time_to_registration_deadline', 'faqs'
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_registrations_count(self, obj):
        return obj.registrations.count()

    def get_time_to_event(self, obj):
        if obj.date_time:
            delta = obj.date_time - timezone.now()
            return str(delta) if delta.total_seconds() > 0 else "Event has ended"

    def get_time_to_registration_deadline(self, obj):
        if obj.registration_deadline:
            delta = obj.registration_deadline - timezone.now()
            return str(delta) if delta.total_seconds() > 0 else "Registration closed"

class OrganiserEventSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    total_amount_collected = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'name', 'participants', 'total_amount_collected']

    def get_participants(self, obj):
        registrations = obj.registrations.all()
        return EventRegistrationSerializer(registrations, many=True).data

    def get_total_amount_collected(self, obj):
        return obj.registration_fee * obj.registrations.count()

class EventListSerializer(serializers.ModelSerializer):
    organiser = EventUserProfileSerializer(source='created_by', read_only=True)  # Get organiser's profile
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    registrations_count = serializers.IntegerField(source='registrations.count', read_only=True)
    time_until_event = serializers.SerializerMethodField()  # Add custom field for event countdown

    class Meta:
        model = Event
        fields = [
            'id', 
            'name', 
            'poster', 
            'date_time', 
            'mode', 
            'location', 
            'organising_committee', 
            'registration_fee', 
            'description', 
            'summary', 
            'tags', 
            'created_by',  # We can send this if you need the ID or other details
            'organiser',  # Organiser profile details
            'likes_count', 
            'registrations_count', 
            'time_until_event'
        ]

    def get_time_until_event(self, obj):
        """
        Custom method to calculate time left until the event date.
        """
        from django.utils import timezone
        time_diff = obj.date_time - timezone.now()
        return str(time_diff)