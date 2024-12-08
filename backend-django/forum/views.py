from rest_framework.viewsets import ModelViewSet
from .models import Forum, Resource, Quiz, Question, Doubt, Answer
from .serializers import ForumSerializer, ResourceSerializer, QuizSerializer, QuestionSerializer, DoubtSerializer, AnswerSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

def filter_by_tags(queryset, tags):
    """
    Filters a queryset to include objects associated with all specified tags.
    """
    if tags:
        tag_list = tags.split(",")  # Split tags by comma
        for tag in tag_list:
            queryset = queryset.filter(tags__name__icontains=tag)
    return queryset

class ForumViewSet(ModelViewSet):
    """
    ViewSet for managing forums.
    """
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer

    @action(detail=True, methods=['get'])
    def doubts(self, request, pk=None):
        forum = self.get_object()
        doubts = forum.doubts.all()
        tag = request.query_params.get('tag')
        if tag:
            doubts = doubts.filter(tags__name__icontains=tag)
        serializer = DoubtSerializer(doubts, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def quizzes(self, request, pk=None):
        forum = self.get_object()
        quizzes = forum.quizzes.all()
        tag = request.query_params.get('tag')
        if tag:
            quizzes = quizzes.filter(tags__name__icontains=tag)
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def resources(self, request, pk=None):
        forum = self.get_object()
        resources = forum.study_materials.all()
        tag = request.query_params.get('tag')
        if tag:
            resources = resources.filter(tags__name__icontains=tag)
        serializer = ResourceSerializer(resources, many=True)
        return Response(serializer.data)
    


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

    @action(detail=False, methods=['get'])
    def filter_by_tags(self, request):
        tags = request.query_params.get('tags', None)
        quizzes = filter_by_tags(self.queryset, tags)
        serializer = self.get_serializer(quizzes, many=True)
        return Response(serializer.data)

class QuestionViewSet(ModelViewSet):
    """
    ViewSet for managing questions in quizzes.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    @action(detail=False, methods=['get'])
    def filter_by_tags(self, request):
        tags = request.query_params.get('tags', None)
        resources = filter_by_tags(self.queryset, tags)
        serializer = self.get_serializer(resources, many=True)
        return Response(serializer.data)

class AnswerViewSet(ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer

    @action(detail=False, methods=['post'])
    def submit(self, request):
        data = request.data
        question_id = data.get('question')
        userprofile_id = data.get('userprofile')
        selected_options = data.get('selected_options')

        if not question_id or not userprofile_id :
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            question = Question.objects.get(id=question_id)
        except Question.DoesNotExist:
            return Response({'error': 'Invalid question ID'}, status=status.HTTP_404_NOT_FOUND)

        answer, created = Answer.objects.update_or_create(
            question=question,
            userprofile_id=userprofile_id,
            defaults={'selected_options': selected_options}
        )

        return Response({
            'message': 'Answer submitted successfully',
            'is_correct': answer.is_correct()
        })

class DoubtViewSet(ModelViewSet):
    """
    ViewSet for managing doubts posted in forums.
    """
    queryset = Doubt.objects.all()
    serializer_class = DoubtSerializer

    @action(detail=False, methods=['get'])
    def filter_by_tags(self, request):
        tags = request.query_params.get('tags', None)
        doubts = filter_by_tags(self.queryset, tags)
        serializer = self.get_serializer(doubts, many=True)
        return Response(serializer.data)
