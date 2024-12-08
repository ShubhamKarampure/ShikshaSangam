from django.db import models
from users.models import UserProfile
from cloudinary.models import CloudinaryField
from multimedia.models import Message, Chat

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
    visibility = models.CharField(
        max_length=10, 
        choices=[('public', 'Public'), ('private', 'Private')], 
        default='public'
    )
    tags = models.ManyToManyField(Tag, related_name='quizzes')


    def __str__(self):
        return self.name

class ForumMod(models.Model):
    userprofile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.userprofile} - {self.forum}"


class Resource(models.Model):
    posted_by = models.ForeignKey(UserProfile, null=True, blank=True)
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='study_materials')
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    file = CloudinaryField('resource', blank=True, null=True, folder='shikshasangam/resources') 
    tags = models.ManyToManyField(Tag, related_name='quizzes')
    

    def __str__(self):
        return self.title


class Quiz(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    tags = models.ManyToManyField(Tag, related_name='quizzes')


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
    tags = models.ManyToManyField(Tag, related_name='questions')
    file = CloudinaryField('question', blank=True, null=True, folder='shikshasangam/questions') 
    question_type = models.CharField( max_length=20,  choices=QUESTION_CHOICES)
    answer_options = models.JSONField(blank=True, null=True)  # For MCQs
    answer_text = models.TextField(null=True, blank=True) # for text answers
    correct_answer = models.TextField()

    def __str__(self):
        return f"Question {self.id} in {self.quiz.title}"


class Doubt(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name='doubts')
    question_text = models.TextField()
    tags = models.ManyToManyField(Tag, related_name='doubts')
    asked_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='asked_doubts')
    status = models.CharField( max_length=10,  choices=[('resolved', 'Resolved'), ('unresolved', 'Unresolved')],default='unresolved')
    resolved_by = models.ForeignKey( UserProfile, on_delete=models.SET_NULL, blank=True, null=True,  related_name='resolved_doubts'  )

    answer = models.ForeignKey(Message, null=True, blank=True, on_delete=models.SET_NULL, related_name='doubt') # so that, we can also have images to answer.

    

    def __str__(self):
        return f"Doubt {self.id}: {self.status}"
