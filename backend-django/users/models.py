import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

# Base User Model
class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('alumni', 'Alumni'),
        ('college_admin', 'College Admin'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'role']

    def __str__(self):
        return self.email


# College Model
class College(models.Model):
    name = models.CharField(max_length=255, unique=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)  # Brief description of the college
    website = models.URLField(blank=True, null=True)  # College website
    established_date = models.DateField(blank=True, null=True)  # Year of establishment
    logo = CloudinaryField('college_logo', blank=True, null=True)  # College logo
    banner_image = CloudinaryField('college_banner', blank=True, null=True)  # Banner image
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# Abstract User Profile
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="base_profile")
    user_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    college = models.ForeignKey(College, on_delete=models.SET_NULL, null=True, blank=True)
    full_name = models.CharField(max_length=255)
    avatar_image = CloudinaryField('avatar', blank=True, null=True)
    banner_image = CloudinaryField('banner', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    social_links = models.JSONField(default=dict, blank=True)
    resume_url = models.URLField(blank=True, null=True)
    preferences = models.JSONField(default=dict, blank=True)
    connections = models.JSONField(default=dict, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


# College Admin Profile
class CollegeAdminProfile(UserProfile):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="college_admin_profile")
    managed_college = models.OneToOneField(College, on_delete=models.CASCADE, related_name="college_admin")

    def __str__(self):
        return f"College Admin: {self.full_name} - {self.managed_college.name}"


# Student Profile
class StudentProfile(UserProfile):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="student_profile")
    enrollment_year = models.PositiveIntegerField()
    current_program = models.CharField(max_length=100)
    expected_graduation_year = models.PositiveIntegerField()

    def __str__(self):
        return f"Student: {self.full_name} - {self.user.email}"


# Alumnus Profile
class AlumnusProfile(UserProfile):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="alumnus_profile")
    graduation_year = models.PositiveIntegerField()
    current_employment = models.JSONField(default=dict, blank=True, null=True)
    career_path = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Alumnus: {self.full_name} - {self.user.email}"


# Signals for Profile Creation
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'student':
            StudentProfile.objects.create(user=instance, full_name=instance.get_full_name())
        elif instance.role == 'alumni':
            AlumnusProfile.objects.create(user=instance, full_name=instance.get_full_name())
        elif instance.role == 'college_admin':
            CollegeAdminProfile.objects.create(user=instance, full_name=instance.get_full_name())


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'base_profile'):
        instance.base_profile.save()
