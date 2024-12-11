from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.dispatch import receiver

# @receiver(post_save, sender=User)
# def send_welcome_email(sender, instance, created, **kwargs):
#     if created:  # Only send email when a new user is created
#         send_mail(
#             'Welcome to ShikshaSangam!',  # Subject
#             'Thank you for registering!',  # Message
            
#             [instance.email],  # To email (user's email)
#             [instance.username],
#             [instance.password]
#             fail_silently=False,
#         )