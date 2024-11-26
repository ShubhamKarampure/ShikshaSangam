from django.db import models
from users.models import UserProfile
from cloudinary.models import CloudinaryField  # For media handling (images/videos)
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError

class Post(models.Model):
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField(blank=True, null=True)
    media = CloudinaryField('media', blank=True, null=True)  # Optional media file (image or video)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='replies')
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)



class Like(models.Model):
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='likes')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')  # Enables liking posts or comments
    created_at = models.DateTimeField(auto_now_add=True)

class Share(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='shares')
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='shares')
    created_at = models.DateTimeField(auto_now_add=True)

class Follow(models.Model):
    follower = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)


# Polls
class Poll(models.Model):
    post = models.OneToOneField(Post, on_delete=models.CASCADE, related_name='poll')
    question = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    poll_type = models.CharField(max_length=20, choices=[
                ('single', 'Single Vote'), 
                ('multiple', 'Multiple Votes')
                ])

class PollOption(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='options')
    option_text = models.CharField(max_length=255)
    votes = models.ManyToManyField(UserProfile, related_name='votes', blank=True)  # Users who voted for this option

class PollVote(models.Model):
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    poll = models.ForeignKey('Poll', on_delete=models.CASCADE)
    option = models.ForeignKey('PollOption', on_delete=models.CASCADE)
    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('userprofile', 'poll','option')  # A user can only vote once per poll
    def save(self, *args, **kwargs):
        # Get the poll's type
        poll = self.poll
        user = self.userprofile

        # Single-vote poll logic
        if poll.poll_type == 'single':
            # Check if user has already voted for this poll
            existing_vote = PollVote.objects.filter(userprofile=user, poll=poll)
            
            if existing_vote.exists():
                # If the user voted for a different option, update the vote
                existing_vote.update(option=self.option)
                return  # Exit the save method since we've already updated the existing vote

        # For multiple-choice polls, ensure the user can only vote once per option
        if poll.poll_type == 'multiple':
            # Check if user has already voted for this option in this poll
            existing_vote = PollVote.objects.filter(userprofile=user, poll=poll, option=self.option)
            if existing_vote.exists():
                raise ValidationError("You have already voted for this option.")
        
        super().save(*args, **kwargs)