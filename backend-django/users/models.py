from django.db import models
from cloudinary.models import CloudinaryField
from .validators import validate_image, validate_pdf, validate_csv_or_excel
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from cloudinary import uploader

class College(models.Model):
    college_name = models.CharField(max_length=255, unique=True)
    college_code = models.CharField(max_length=50, unique=True, blank=True, null=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField()
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.college_name


class UserProfile(models.Model):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('alumni', 'Alumni'),
        ('college_admin', 'College Admin'),
        ('college_staff', 'Faculty')
    )
    STATUS_CHOICES = (
        ('online', 'Online'),
        ('offline', 'Offline')
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='offline')  # Added status field
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user")
    college = models.ForeignKey(College, on_delete=models.SET_NULL, null=True)
    full_name = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    avatar_image = CloudinaryField('avatar', folder='shikshasangam/avatar', blank=True, null=True, validators=[validate_image])
    banner_image = CloudinaryField('banner', folder='shikshasangam/banner', blank=True, null=True, validators=[validate_image])
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    social_links = models.JSONField(default=dict, null=True, blank=True)  # e.g., {"linkedin": "URL", "twitter": "URL"}
    
    resume = CloudinaryField('resume', folder='shikshasangam/resume', null=True, blank=True)
    experience = models.JSONField(default=dict, null=True, blank=True) 
    project = models.JSONField(default=dict, null=True, blank=True) 
    linkedin_url = models.URLField(max_length=200, blank=True, null=True)
    skills = models.JSONField(default=dict, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):

        return f"{self.full_name or self.user.username}"

class CollegeAdminProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class StudentProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    enrollment_year = models.PositiveIntegerField(blank=True, null=True)
    current_program = models.CharField(max_length=100, blank=True, null=True)
    expected_graduation_year = models.PositiveIntegerField(blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.profile.full_name} - {self.current_program}"


class AlumnusProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    graduation_year = models.PositiveIntegerField(blank=True, null=True)
    current_employment = models.JSONField(default=dict, blank=True, null=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.profile.full_name} - Alumnus {self.graduation_year}"


class CollegeStaffProfile(models.Model):
    profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    position = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.profile.full_name} - {self.position}"


class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="uploaded_files")
    file = CloudinaryField(resource_type="raw", folder='shikshasangam/uploads', validators=[validate_csv_or_excel])
    file_name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    def __str__(self) -> str:
       return f"{self.file_name} , {self.user.user.college}"
    
    def delete(self, *args, **kwargs):
        # Delete the file from Cloudinary
        uploader.destroy(self.file.public_id)
        super().delete(*args, **kwargs)  # Call the parent class delete method

    '''
from social.models import Follow
from django.db.models import Count

duplicates = (
    Follow.objects.values('follower', 'followed')
    .annotate(count=Count('id'))
    .filter(count__gt=1)
)

print(f"Found {len(duplicates)} duplicate pairs.")

for duplicate in duplicates:
    Follow.objects.filter(
        follower=duplicate['follower'],
        followed=duplicate['followed']
    ).exclude(
        id=Follow.objects.filter(
            follower=duplicate['follower'],
            followed=duplicate['followed']
        ).first().id
    ).delete()

duplicates = (
    Follow.objects.values('follower', 'followed')
    .annotate(count=Count('id'))
    .filter(count__gt=1)
)

print(f"Remaining duplicates: {len(duplicates)}")  # Should be 0

    
    
    '''
