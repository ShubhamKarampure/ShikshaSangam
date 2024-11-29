from django.db import models
import uuid
from cloudinary.models import CloudinaryField
from .validators import validate_image, validate_pdf
from django.contrib.auth.models import User
from .validators import validate_image
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.conf import settings

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('alumni', 'Alumni'),
        ('college_admin', 'College Admin'),
        ('college_staff', 'Faculty')
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

class CollegeAdminProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="college_admin")
    college = models.ForeignKey('College', on_delete=models.SET_NULL, null=True, blank=True, related_name='college_admins')
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Phone number validation
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', 
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, validators=[phone_regex], blank=True, null=True)
    
    def __str__(self):
        return f"{self.full_name} - {self.college.college_name if self.college else 'No College'}"

class College(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    college_name = models.CharField(max_length=255, unique=True)
    college_code = models.CharField(max_length=50, unique=True, blank=True, null=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField()
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.college_name

class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user")
    college = models.ForeignKey(College, on_delete=models.SET_NULL, null=True)
    full_name = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    avatar_image = CloudinaryField('avatar', blank=True, null=True, validators=[validate_image])
    banner_image = CloudinaryField('banner', blank=True, null=True, validators=[validate_image])
    
    # Phone number validation
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$', 
        message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
    )
    contact_number = models.CharField(max_length=15, validators=[phone_regex], blank=True, null=True)
    
    specialization = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    social_links = models.JSONField(default=dict, null=True, blank=True)  # e.g., {"linkedin": "URL", "twitter": "URL"}
    resume = CloudinaryField('resume', null=True, blank=True)
    preferences = models.JSONField(default=dict ,null=True, blank=True)  # {"domains": [], "roles": [], "interests": []}
    connections = models.JSONField(default=dict, null=True, blank=True)  # {"followers_count": 0, "following_count": 0}
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name or self.user.username}"

class StudentProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    enrollment_year = models.PositiveIntegerField(blank=True,null=True)
    current_program = models.CharField(max_length=100,blank=True,null=True)
    expected_graduation_year = models.PositiveIntegerField(blank=True,null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.profile.full_name} - {self.current_program}"

class AlumnusProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    graduation_year = models.PositiveIntegerField(blank=True)
    current_employment = models.JSONField(default=dict, blank=True, null=True)
    career_path = models.TextField(blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.profile.full_name} - Alumnus {self.graduation_year}"

class CollegeStaffProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    position = models.CharField(max_length=100,blank=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.profile.full_name} - {self.position}"