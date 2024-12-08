from django.db import models
from users.models import UserProfile
from cloudinary.models import CloudinaryField  # For media handling (images/videos)
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver
from multimedia.models import Chat

class Post(models.Model):
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField(blank=True, null=True)
    media = CloudinaryField('media', blank=True, null=True, folder='shikshasangam/postmedia')  # Optional media file (image or video)
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
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE) # can be {20->post, 21-> Comment, 22-> reply}
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')  # Enables liking posts or comments
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['userprofile', 'content_type', 'object_id'], name='unique_like_per_object')
        ]
        
class Share(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='shares')
    shared_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='shares_made')
    shared_to = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='shares_received')
    created_at = models.DateTimeField(auto_now_add=True)

class Follow(models.Model):
    follower = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='following')
    followed = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        constraints = [
                models.UniqueConstraint(fields=['follower', 'followed'], name='unique_follower_followed')
            ]
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


class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('follow', 'Follow Request'),
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('post', 'New Post'),
        ('share', 'Share'),
        ('poll', 'Poll Response'),
        ('mutual_follow', 'Mutual Follow'),
        ('message', 'Message'),
    )

    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    content = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    avatar = models.URLField(max_length=255, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    follower_full_name = models.CharField(max_length=255, null=True, blank=True)  # Add full_name field
    follower_userprofile_id = models.IntegerField(null=True, blank=True)  # Add userprofile ID field

    def __str__(self):
        return f"Notification for {self.userprofile} - {self.title}"

    def mark_as_read(self):
        self.is_read = True
        self.save()


@receiver(post_save, sender=Follow)
def create_chat_for_mutual_follow(sender, instance, created, **kwargs):
    if created:  # Only act on new Follow instances
        follower = instance.follower
        followed = instance.followed

        # Check if a reciprocal follow exists
        reciprocal_follow = Follow.objects.filter(follower=followed, followed=follower).exists()

        if reciprocal_follow:
            # Check if a chat already exists between these two users
            chat_exists = Chat.objects.filter(participants=follower).filter(participants=followed).exists()

            if not chat_exists:
                # Create a new chat instance
                chat = Chat.objects.create()
                chat.participants.add(follower, followed)
                chat.save()
                
@receiver(post_save, sender=Follow)
def create_follow_notification(sender, instance, created, **kwargs):
    if created:
        title = f"{instance.follower.full_name} sent you a follow request."
        content = f"{instance.follower.full_name} wants to follow you."

        # Get the avatar of the follower (from the UserProfile model)
        avatar = instance.follower.avatar_image.url if instance.follower.avatar_image else None
        
        # Create the notification
        notification = Notification(
            userprofile=instance.followed,
            title=title,
            content=content,
            notification_type='follow',
            avatar=avatar,  # Include avatar URL in the notification
            follower_full_name=instance.follower.full_name,  # Store the full_name of the follower
            follower_userprofile_id=instance.follower.id  # Store the userprofile ID of the follower
        )
        notification.save()


@receiver(post_save, sender=Like)
def create_like_notification(sender, instance, created, **kwargs):
    if created:
        content_type = ContentType.objects.get_for_model(instance.content_object)
        if content_type.model == 'post':
            title = f"{instance.userprofile.full_name} liked your post."
            content = f"{instance.userprofile.full_name} liked your post."

            # Get the avatar of the user who liked (from the UserProfile model)
            avatar = instance.userprofile.avatar_image.url if instance.userprofile.avatar_image else None
            
            notification = Notification(
                userprofile=instance.content_object.userprofile,
                title=title,
                content=content,
                notification_type='like',
                avatar=avatar  # Include avatar URL in the notification
            )
            notification.save()


@receiver(post_save, sender=Follow)
def create_mutual_follow_notification(sender, instance, created, **kwargs):
    if created:
        reciprocal_follow = Follow.objects.filter(follower=instance.followed, followed=instance.follower).exists()
        
        if reciprocal_follow:
            title = f"You and {instance.follower.full_name} are now following each other."
            content = f"You and {instance.follower.full_name} are now connected."
            
            # Get the avatar of the follower (from the UserProfile model)
            avatar = instance.follower.avatar_image.url if instance.follower.avatar_image else None
            
            notification = Notification(
                userprofile=instance.follower,
                title=title,
                content=content,
                notification_type='mutual_follow',
                avatar=avatar  # Include avatar URL in the notification
            )
            notification.save()
