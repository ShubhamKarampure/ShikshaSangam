from django.db import models

# Create your models here.
from django.db import models
from users.models import UserProfile
from cloudinary.models import CloudinaryField

class Event(models.Model):
    
    EVENT_TYPE_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    event_type = models.CharField(max_length=10, choices=EVENT_TYPE_CHOICES)
    host = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="hosted_events")
    location = models.CharField(max_length=255, blank=True, null=True)  # For offline events
    meeting_id = models.CharField(max_length=255, blank=True, null=True)  # For online events (VideoSDK)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    poster = CloudinaryField(null=True)

    # def is_online(self):
    #     return self.event_type == 'online'

    def __str__(self):
        return self.title


# 
