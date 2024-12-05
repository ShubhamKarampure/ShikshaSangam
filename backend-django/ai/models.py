from django.db import models
from social.models import Post
from users.models import User, UserProfile

# Create your models here.
class UserEmbedding(models.Model):
    user = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    vector_db_id = models.CharField(max_length=255, unique=True)

class PostEmbedding(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE)
    vector_db_id = models.CharField(max_length=255, unique=True)