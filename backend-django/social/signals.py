from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver
from multimedia.models import Chat
from .models import Like, Follow, Notification
from django.contrib.contenttypes.models import ContentType



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
            title = f"{instance.follower.full_name} liked your post."
            content = f"{instance.follower.full_name} liked your post."

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
