from rest_framework import serializers
from .models import Forum, Resource, Quiz, Question, Doubt, ForumMod
from multimedia.models import Message
from users.models import UserProfile
from users.serializers import MiniUserProfileSerializer

class ForumSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, queryset=UserProfile.objects.all())
    
    class Meta:
        model = Forum
        fields = '__all__'

class ForumModSerializer(serializers.ModelSerializer):
    userprofile = MiniUserProfileSerializer()
    class Meta:
        model = ForumMod
        fields = ['userprofile','forum']


class ResourceSerializer(serializers.ModelSerializer):
    posted_by = MiniUserProfileSerializer()
    forum = serializers.PrimaryKeyRelatedField(queryset=Forum.objects.all())
    
    class Meta:
        model = Resource
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    forum = serializers.PrimaryKeyRelatedField(queryset=Forum.objects.all())

    class Meta:
        model = Quiz
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all())
    
    class Meta:
        model = Question
        fields = '__all__'




class DoubtSerializer(serializers.ModelSerializer):
    forum = serializers.PrimaryKeyRelatedField(queryset=Forum.objects.all())
    asked_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    resolved_by = serializers.PrimaryKeyRelatedField(
        queryset=UserProfile.objects.all(), required=False, allow_null=True
    )
    answer = serializers.PrimaryKeyRelatedField(
        queryset=Message.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = Doubt
        fields = '__all__'
