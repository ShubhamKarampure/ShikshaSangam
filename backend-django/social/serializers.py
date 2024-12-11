from rest_framework import serializers
from .models import Post, Comment, Like, Follow, Share, Poll, PollOption, PollVote, Reply,Notification
from users.models import UserProfile
from users.serializers import UserProfileSerializer
from .Text_Moderator import TextModeration

class SocialUserProfileSerializer(serializers.ModelSerializer): # Can be used to avoid writing long views, Still working on it....
    """Serializer for UserProfile to include basic user details."""
    class Meta:
        model = UserProfile
        fields = ['id', 'full_name', 'avatar_image', 'role', 'profile_link']
        # Add other fields if required

class PostSerializer(serializers.ModelSerializer):
    # Includes all fields in Post model
    # userprofile = SocialUserProfileSerializer()
    class Meta:
        model = Post
        fields = '__all__'
    
    def create(self, validated_data):
        # Get the content from the request data
        content = validated_data.get('content', '')

        # Initialize the TextModeration instance
        moderator = TextModeration(thresholdOK=0.2)

        # Moderate the content
        is_safe = moderator.moderate_text(content)

        # If the content is not safe, raise a validation error
        if not is_safe:
            raise serializers.ValidationError(
                {"content": "errorcpv : The content of this post is not safe and violates our guidelines."}
            )

        # Proceed with the default creation if the content is safe
        return super().create(validated_data)

class CommentSerializer(serializers.ModelSerializer):
    # Includes all fields in Comment model
    # userprofile = SocialUserProfileSerializer()

    class Meta:
        model = Comment
        fields = '__all__'

class ReplySerializer(serializers.ModelSerializer):
    # Includes all fields in Comment model
    # userprofile = SocialUserProfileSerializer()

    class Meta:
        model = Reply
        fields = '__all__'

class LikeSerializer(serializers.ModelSerializer):
    # Includes all fields in Like model
    class Meta:
        model = Like
        fields = '__all__'

class FollowSerializer(serializers.ModelSerializer):
    # Includes all fields in Follow model
    
    class Meta:
        model = Follow
        fields = '__all__'

class ShareSerializer(serializers.ModelSerializer):
    # Includes all fields in Share model
    class Meta:
        model = Share
        fields = '__all__'

class PollSerializer(serializers.ModelSerializer):
    # Includes all fields in Poll model, links with PollOption and PollVote handled separately
    class Meta:
        model = Poll
        fields = '__all__'

class PollOptionSerializer(serializers.ModelSerializer):
    # Serializer for PollOption linked to Poll
    class Meta:
        model = PollOption
        fields = '__all__'

class PollVoteSerializer(serializers.ModelSerializer):
    # Serializer for PollVote linked to PollOption and Poll
    class Meta:
        model = PollVote
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            'id', 'userprofile', 'title', 'content', 'notification_type', 'avatar', 
             'is_read', 'created_at',
             # 'avatar','follower_full_name', 'follower_userprofile_id'
        ]

    def update(self, instance, validated_data):
        """
        Custom update method to mark a notification as read when updating
        """
        if 'is_read' in validated_data:
            instance.is_read = validated_data['is_read']
        
        # Optionally handle other fields like follower_full_name or follower_userprofile_id if needed.
        # These fields might not be updated via the serializer as they are not likely to change after creation.
        instance.save()
        return instance

