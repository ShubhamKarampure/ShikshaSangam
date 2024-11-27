from django.db import models
import uuid
from cloudinary.models import CloudinaryField
from .validators import validate_image
from django.contrib.auth.models import User

class CollegeAdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="college_admin")
    role = 'admin'
    college = models.ForeignKey('College', on_delete=models.SET_NULL, null=True, blank=True, related_name='college_admins')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # New fields for name, phone number
    full_name = models.CharField(max_length=255)  # Full name of the admin
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # Phone number, optional
    
    def __str__(self):
        return f"Admin Profile: {self.full_name} ({self.user.username})"

class College(models.Model):
    college_name = models.CharField(max_length=255)
    college_code = models.CharField(max_length=50, unique=True, blank=True, null=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
    college = models.ForeignKey(College, on_delete=models.SET_NULL, null=True, blank=True)
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('alumnus', 'Alumnus'),
        ('staff', 'Staff'),
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='student')
    full_name = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    avatar_image = CloudinaryField('avatar', blank=True, null=True, validators=[validate_image])
    banner_image = CloudinaryField('banner', blank=True, null=True, validators=[validate_image])
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    social_links = models.JSONField(default=dict)  # e.g., {"linkedin": "URL", "twitter": "URL"}
    resume = CloudinaryField('resume', blank=True, null=True)
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
