from rest_framework import serializers
from .models import Forum, Resource, Quiz, Question, Doubt, ForumMod, Answer
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


class AnswerSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(source='question.text', read_only=True)
    is_correct = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        fields = ['id', 'question', 'question_text', 'userprofile', 'selected_options', 'submitted_at', 'is_correct']

    def get_is_correct(self, obj):
        return obj.is_correct()

class DoubtSerializer(serializers.ModelSerializer):
    forum = serializers.PrimaryKeyRelatedField(queryset=Forum.objects.all())
    asked_by = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())
    resolved_by = MiniUserProfileSerializer()
    answer = serializers.PrimaryKeyRelatedField(
        queryset=Message.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = Doubt
        fields = '__all__'
