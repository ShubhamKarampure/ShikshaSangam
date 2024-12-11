from django.db import models
from django.conf import settings
from users.models import UserProfile
from cloudinary.models import CloudinaryField
class Job(models.Model):
    JOB_TYPES = [
        ('FT', 'Full-Time'),
        ('PT', 'Part-Time'),
        ('IN', 'Internship'),
        ('CO', 'Contract'),
    ]

    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True, null=True)
    job_type = models.CharField(max_length=2, choices=JOB_TYPES, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    skills_required = models.TextField(help_text="Comma-separated skills", null=True, blank=True)
    salary_range = models.CharField(max_length=50, blank=True, null=True)
    posted_by = models.ForeignKey(
       UserProfile, on_delete=models.CASCADE, related_name="jobs_posted"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company} by {self.posted_by}"


class Application(models.Model):
    STATUS_CHOICES = [
        ('P', 'Pending'),
        ('S', 'Shortlisted'),
        ('R', 'Rejected'),
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    applicant = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="applications"
    )
    resume = CloudinaryField('job-resumes', folder='shikshasangam/job-resumes')
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    applied_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"Application by {self.applicant.username} for {self.job.title}"


# class Referral(models.Model):
#     alumnus = models.OneToOneField(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="referral"
#     )
#     company = models.CharField(max_length=255)
#     roles_available = models.TextField(help_text="Comma-separated roles")
#     is_active = models.BooleanField(default=True)

#     def __str__(self):
#         return f"Referrals by {self.alumnus.username} for {self.company}"
