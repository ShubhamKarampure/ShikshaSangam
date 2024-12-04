from django.db import models

# Create your models here.
from django.db import models
from users.models import UserProfile
from cloudinary.models import CloudinaryField

from django.db import models
from cloudinary.models import CloudinaryField

class Event(models.Model):

    MODE_CHOICES =  (
        ('online', 'Online'),
        ('offline', 'Offline')
    )
  
    name = models.CharField(max_length=255)
    poster = CloudinaryField('event_posters', folder='shikshasangam/events', null=True, blank=True)
    date_time = models.DateTimeField(null=True,blank=True, auto_now_add=True)
    mode = models.CharField(max_length=123, choices=MODE_CHOICES, default='Online')
    location = models.CharField(max_length=255, null=True, blank=True)
    organising_committee = models.CharField(max_length=255, null=True, blank=True)
    type = models.CharField(max_length=100, null=True, blank=True)
    organiser_contacts = models.JSONField(default=dict, blank=True, null=True) 
    prizes = models.JSONField(default=dict, blank=True, null=True) 
    registration_fee = models.FloatField(default=0)
    description = models.TextField(null=True, blank=True)
    summary = models.CharField(max_length=255, null=True, blank=True)
    event_plan = models.JSONField(default=dict, blank=True, null=True)  # Detailed plan of the event
    speaker_profiles = models.ManyToManyField(UserProfile, blank=True, related_name="speaking_events")  # Linked to app users
    speakers = models.JSONField(default=list, blank=True)  # List of speakers or hosts
    tags = models.JSONField(default=list, blank=True)  # e.g., ["ML", "AI"]
    created_by = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, related_name='created_events')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    online_meet_id = models.CharField(max_length=255, null=True, blank=True)
    registration_deadline = models.DateTimeField(null=True, blank=True, auto_now_add=True)

    

    def __str__(self):
        return self.name

class EventRegistration(models.Model):
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="registrations")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="registrations")
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.userprofile.full_name or self.userprofile.user.username} - {self.event.name}"


class EventFAQ(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="faqs")
    question = models.TextField(null=True, blank=True)
    answer = models.TextField(blank=True, null=True)  # Answer can be optional initially
    created_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="created_faqs")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"FAQ for {self.event.name}: {self.question[:30]}"

class EventLike(models.Model):
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="liked_events")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="likes")
    liked_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.userprofile.full_name or self.userprofile.user.username} liked {self.event.name}"

