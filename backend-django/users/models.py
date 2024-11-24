from django.db import models

# Create your models here.
from django.db import models

# Create your models here.


from django.db import models
import uuid

class College(models.Model):
    college_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    college_name = models.CharField(max_length=255)
    college_code = models.CharField(max_length=50, unique=True, blank=True, null=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class UserProfile(models.Model):
    
    college = models.ForeignKey(College, on_delete=models.SET_NULL, null=True, blank=True)
    full_name = models.CharField(max_length=255)
    bio = models.TextField(blank=True, null=True)
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    social_links = models.JSONField(default=dict)  # e.g., {"linkedin": "URL", "twitter": "URL"}
    resume_url = models.URLField(blank=True, null=True)
    preferences = models.JSONField(default=dict)  # {"domains": [], "roles": [], "interests": []}
    connections = models.JSONField(default=dict)  # {"followers_count": 0, "following_count": 0}
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class StudentProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)  # Linked to UserProfile
    enrollment_year = models.PositiveIntegerField()
    current_program = models.CharField(max_length=100)  # Text field for program name
    expected_graduation_year = models.PositiveIntegerField()
    specialization = models.CharField(max_length=100, blank=True, null=True)

class AlumnusProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)  # Linked to UserProfile
    graduation_year = models.PositiveIntegerField()
    current_employment = models.JSONField(default=dict, blank=True, null=True)  # e.g., {"company": "XYZ", "role": "Engineer"}
    career_path = models.TextField(blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)

class CollegeStaffProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)  # Linked to UserProfile
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=100, blank=True, null=True)
