from django.db import models

# Create your models here.
from django.db import models
from cloudinary.models import CloudinaryField
from .validators import validate_image

class TestModel(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = CloudinaryField('image', validators=[validate_image])  # Cloudinary image field

    def __str__(self):
        return self.name