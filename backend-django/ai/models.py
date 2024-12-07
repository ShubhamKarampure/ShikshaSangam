from django.db import models
from social.models import Post
from users.models import User, UserProfile

# Create your models here.


class UserEmbedding(models.Model):
    user = models.OneToOneField('users.UserProfile', on_delete=models.CASCADE, related_name='embedding')
    vector_id = models.CharField(max_length=255, unique=True)  # Identifier in FAISS
    metadata = models.JSONField(default=dict)  # Any additional metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    vector = models.JSONField(null=True, blank=True)

class PostEmbedding(models.Model):
    post = models.OneToOneField('social.Post', on_delete=models.CASCADE, related_name='embedding')
    vector_id = models.CharField(max_length=255, unique=True)  # Identifier in FAISS
    metadata = models.JSONField(default=dict)  # Any additional metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    vector = models.JSONField(null=True, blank= True)