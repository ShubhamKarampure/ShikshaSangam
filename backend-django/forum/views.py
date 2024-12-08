from rest_framework.viewsets import ModelViewSet
from .models import Forum, Resource, Quiz, Question, Doubt
from .serializers import ForumSerializer, ResourceSerializer, QuizSerializer, QuestionSerializer, DoubtSerializer

class ForumViewSet(ModelViewSet):
    """
    ViewSet for managing forums.
    """
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer

class ResourceViewSet(ModelViewSet):
    """
    ViewSet for managing resources linked to forums.
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

class QuizViewSet(ModelViewSet):
    """
    ViewSet for managing quizzes within forums.
    """
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuestionViewSet(ModelViewSet):
    """
    ViewSet for managing questions in quizzes.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class DoubtViewSet(ModelViewSet):
    """
    ViewSet for managing doubts posted in forums.
    """
    queryset = Doubt.objects.all()
    serializer_class = DoubtSerializer
