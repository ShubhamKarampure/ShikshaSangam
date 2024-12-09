from django.db import models
from users.models import UserProfile
from cloudinary.models import CloudinaryField
from multimedia.models import Message,Chat
from django.utils.timezone import now
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True, default='miscellaneous')
    def __str__(self):
        return self.name

class Forum(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    created_by = models.ForeignKey(UserProfile, on_delete=models.SET_NULL, null=True, blank=True)
    banner = CloudinaryField('forum_avatar', blank=True, null=True, folder='shikshasangam/forum_avatar') 
    avatar = CloudinaryField('forum_banner', blank=True, null=True, folder='shikshasangam/forum_banner') 
    participants = models.ManyToManyField(UserProfile, related_name='forums')
    chat = models.ForeignKey(Chat, on_delete=models.SET_NULL, null=True)
    visibility = models.CharField(
        max_length=10, 
        choices=[('public', 'Public'), ('private', 'Private')], 
        default='public'
    )
    tags = models.ManyToManyField(Tag, related_name='forums', null=True, blank=True)
    created_at = models.DateTimeField(default=now)


    def __str__(self):
        return self.name

class ForumMod(models.Model):
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=now)

    
    def __str__(self):
        return f"{self.userprofile} - {self.forum}"


class Resource(models.Model):
    posted_by = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.SET_NULL)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='study_materials')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    file = CloudinaryField('resource', blank=True, null=True, folder='shikshasangam/resources') 
    tags = models.ManyToManyField(Tag, related_name='resources', null=True, blank=True)
    created_at = models.DateTimeField(default=now)
    

    def __str__(self):
        return self.title


class Quiz(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    tags = models.ManyToManyField(Tag, related_name='quizzes', null=True, blank=True)
    created_by = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(default=now)


    def __str__(self):
        return self.title


class Question(models.Model):

    QUESTION_CHOICES = [
        ('MCQ', 'Multiple Choice'), 
        ('TF', 'True/False'),
        ('text','Text Answer')
    ]
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='questions', null=True, blank=True)
    file = CloudinaryField('question', blank=True, null=True, folder='shikshasangam/questions') 
    question_type = models.CharField( max_length=20,  choices=QUESTION_CHOICES)
    answer_options = models.JSONField(blank=True, null=True)  # For MCQs
    correct_answer = models.JSONField(null=True ,blank=True)
    created_by = models.ForeignKey(UserProfile, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(default=now)


    def __str__(self):
        return f"Question {self.id} in {self.quiz.title}"
   
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='answers')
    selected_options = models.JSONField(blank=True, null=True)  # User's answer: {"A": true, "B": false, ...}
    submitted_at = models.DateTimeField(auto_now_add=True)
    answer_text = models.TextField(null=True, blank = True)
    is_correct = models.BooleanField(default=False)
    
    def check_ans(self):
        """Validate the user's answer."""
        if self.question.question_type in ['MCQ_SINGLE', 'MCQ_MULTI']:
            self.is_correct = self.selected_options == self.question.correct_answer
            
        elif self.question.question_type == 'TF':
            self.is_correct=str(self.selected_options.get("TF", "")).lower() == str(self.question.correct_answer).lower()
            
        else:
            self.is_correct = False
        
        self.save()
        return self.is_correct

    def __str__(self):
        return f"Answer by {self.userprofile} for Question {self.question.id}"




class Doubt(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='doubts')
    question_text = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='doubts', null=True, blank=True)
    asked_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='asked_doubts')
    status = models.CharField( max_length=10,  choices=[('resolved', 'Resolved'), ('unresolved', 'Unresolved')],default='unresolved')
    resolved_by = models.ForeignKey( UserProfile, on_delete=models.SET_NULL, blank=True, null=True,  related_name='resolved_doubts'  )
    created_at = models.DateTimeField(default=now)
    answer = models.ForeignKey(Message, null=True, blank=True, on_delete=models.SET_NULL, related_name='doubt') # so that, we can also have images to answer.

    

    def __str__(self):
        return f"Doubt {self.id}: {self.status}"


class Vote(models.Model):
    VOTE_CHOICES = [
        (1, 'Upvote'),
        (-1, 'Downvote'),
    ]

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)  # Generic FK
    object_id = models.PositiveIntegerField()  # ID of the related object
    content_object = GenericForeignKey('content_type', 'object_id')
    vote = models.SmallIntegerField(choices=VOTE_CHOICES)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')  # One vote per user per object
        indexes = [models.Index(fields=['content_type', 'object_id'])]
