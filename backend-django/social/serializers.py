from rest_framework import serializers
from .models import Post, Comment, Like, Follow, Share, Poll, PollOption, PollVote

class PostSerializer(serializers.ModelSerializer):
    # Includes all fields in Post model
    class Meta:
        model = Post
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    # Includes all fields in Comment model
    class Meta:
        model = Comment
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
