from rest_framework import serializers
from .models import Forum, Resource, Quiz, Question, Doubt, ForumMod, Answer, Tag, Vote
from multimedia.models import Message
from users.models import UserProfile
from users.serializers import MiniUserProfileSerializer
import random
from django.contrib.contenttypes.models import ContentType


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']
class ForumSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, queryset=UserProfile.objects.all())
    num_participants = serializers.IntegerField(source='participants.count', read_only=True)
    random_top_participants = serializers.SerializerMethodField()
    class Meta:
        model = Forum
        fields = '__all__'
    
    def get_random_top_participants(self, obj):
        participants = obj.participants.all()
        random_sample = random.sample(list(participants), min(3, len(participants)))
        return MiniUserProfileSerializer(random_sample, many=True).data
    

class ForumModSerializer(serializers.ModelSerializer):
    userprofile = MiniUserProfileSerializer()
    class Meta:
        model = ForumMod
        fields = ['userprofile','forum']


class ResourceSerializer(serializers.ModelSerializer):
    # posted_by = MiniUserProfileSerializer()
    forum = serializers.PrimaryKeyRelatedField(queryset=Forum.objects.all())
    tags = serializers.IntegerField(source='tags.count', read_only=True)
    num_upvotes = serializers.SerializerMethodField()
    num_downvotes = serializers.SerializerMethodField()
    net_votes = serializers.SerializerMethodField()

    def get_num_upvotes(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Vote.objects.filter(content_type=content_type, object_id=obj.id, vote=1).count()

    def get_num_downvotes(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Vote.objects.filter(content_type=content_type, object_id=obj.id, vote=-1).count()

    def get_net_votes(self, obj):
        return self.get_num_upvotes(obj) - self.get_num_downvotes(obj)

    class Meta:
        model = Resource
        fields = '__all__'


class QuizSerializer(serializers.ModelSerializer):
    forum = serializers.PrimaryKeyRelatedField(queryset=Forum.objects.all())
    num_upvotes = serializers.SerializerMethodField()
    num_downvotes = serializers.SerializerMethodField()
    net_votes = serializers.SerializerMethodField()

    def get_num_upvotes(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Vote.objects.filter(content_type=content_type, object_id=obj.id, vote=1).count()

    def get_num_downvotes(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Vote.objects.filter(content_type=content_type, object_id=obj.id, vote=-1).count()

    def get_net_votes(self, obj):
        return self.get_num_upvotes(obj) - self.get_num_downvotes(obj)

    class Meta:
        model = Quiz
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all())
    num_answers = serializers.IntegerField(source='answers.count', read_only=True)
    num_upvotes = serializers.SerializerMethodField()
    num_downvotes = serializers.SerializerMethodField()
    net_votes = serializers.SerializerMethodField()

    def get_num_upvotes(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Vote.objects.filter(content_type=content_type, object_id=obj.id, vote=1).count()

    def get_num_downvotes(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Vote.objects.filter(content_type=content_type, object_id=obj.id, vote=-1).count()

    def get_net_votes(self, obj):
        return self.get_num_upvotes(obj) - self.get_num_downvotes(obj)


    # num_correct_answers = serializers.SerializerMethodField()
    # num_wrong_answers = serializers.SerializerMethodField()

    # def get_num_correct_answers(self, obj):
    #     return obj.answers.filter(selected_options=obj.correct_answer).count()

    # def get_num_wrong_answers(self, obj):
    #     return obj.answers.exclude(selected_options=obj.correct_answer).count()
    
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
    asked_by = MiniUserProfileSerializer()
    resolved_by = MiniUserProfileSerializer()
    num_upvotes = serializers.SerializerMethodField()
    num_downvotes = serializers.SerializerMethodField()
    net_votes = serializers.SerializerMethodField()

    def get_num_upvotes(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Vote.objects.filter(content_type=content_type, object_id=obj.id, vote=1).count()

    def get_num_downvotes(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Vote.objects.filter(content_type=content_type, object_id=obj.id, vote=-1).count()

    def get_net_votes(self, obj):
        return self.get_num_upvotes(obj) - self.get_num_downvotes(obj)
    answer = serializers.PrimaryKeyRelatedField(
        queryset=Message.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = Doubt
        fields = '__all__'
