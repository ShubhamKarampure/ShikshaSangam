from django.db import models
from users.models import UserProfile
from django.utils.timezone import now
from django.db.models.signals import post_save
from django.dispatch import receiver
from cloudinary.models import CloudinaryField 

class Chat(models.Model):
    participants = models.ManyToManyField(UserProfile, related_name='chats')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # Useful for ordering chats by recent activity

    class Meta:
        ordering = ['-updated_at']  # Recent chats appear first

    def last_message(self):
        """Returns the last message in the chat."""
        return self.messages.order_by('-timestamp').first()


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, db_index=True)  # Indexed for better performance
    is_read = models.BooleanField(default=False)
    media = CloudinaryField('media', folder='shikshasangam/chat/media', blank=True, null=True)
    
    class Meta:
        ordering = ['timestamp']  # Messages ordered by time

# Signal to update Chat's updated_at field when a new message is added
@receiver(post_save, sender=Message)
def update_chat_timestamp(sender, instance, **kwargs):
    instance.chat.updated_at = now()
    instance.chat.save()
