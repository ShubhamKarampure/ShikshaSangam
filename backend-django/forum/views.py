from rest_framework.viewsets import ModelViewSet
from rest_framework.viewsets import ViewSet
from .models import Forum, Resource, Quiz, Question, Doubt, Answer, Tag, Vote
from .serializers import ForumSerializer, ResourceSerializer, QuizSerializer, QuestionSerializer, DoubtSerializer, AnswerSerializer, TagSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from django.contrib.contenttypes.models import ContentType

def filter_by_tags(queryset, tags):
    """
    Filters a queryset to include objects associated with all specified tags.
    """
    if tags:
        tag_list = tags.split(",")  # Split tags by comma
        for tag in tag_list:
            queryset = queryset.filter(tags__name__icontains=tag)
    return queryset
def add_or_update_tags(tag_names):
    """
    Add new tags or update existing tags by name.
    """
    tags = []
    for name in tag_names:
        tag, created = Tag.objects.get_or_create(name=name.strip())
        tags.append(tag)
    return tags

class ForumViewSet(ModelViewSet):
    """
    ViewSet for managing forums.
    """
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer

    @action(detail=True, methods=['post'], url_path='participate')
    def participate(self, request, pk=None):
        try:
            forum = self.get_object()
            userprofile = request.user.userprofile  # Assuming request.user is linked to UserProfile
            if userprofile in forum.participants.all():
                return Response({'message': 'Already participating'}, status=status.HTTP_200_OK)

            forum.participants.add(userprofile)
            return Response({'message': 'Successfully joined the forum'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=True, methods=['post'], url_path='add-participants')
    def add_participants(self, request, pk=None):
        """
        Add multiple users to the forum participants.
        """
        try:
            forum = self.get_object()
            user_ids = request.data.get('user_ids', [])
            
            if not isinstance(user_ids, list):
                return Response({'error': 'user_ids must be a list'}, status=status.HTTP_400_BAD_REQUEST)

            added_users = []
            for user_id in user_ids:
                try:
                    userprofile = UserProfile.objects.get(id=user_id)
                    if userprofile not in forum.participants.all():
                        forum.participants.add(userprofile)
                        added_users.append(user_id)
                except UserProfile.DoesNotExist:
                    continue  # Skip invalid user IDs

            return Response({'message': f'Added users: {added_users}'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    @action(detail=True, methods=['post'], url_path='remove-participants')
    def remove_participants(self, request, pk=None):
        """
        Remove multiple users from the forum participants.
        """
        try:
            forum = self.get_object()
            user_ids = request.data.get('user_ids', [])
            
            if not isinstance(user_ids, list):
                return Response({'error': 'user_ids must be a list'}, status=status.HTTP_400_BAD_REQUEST)

            removed_users = []
            for user_id in user_ids:
                try:
                    userprofile = UserProfile.objects.get(id=user_id)
                    if userprofile in forum.participants.all():
                        forum.participants.remove(userprofile)
                        removed_users.append(user_id)
                except UserProfile.DoesNotExist:
                    continue  # Skip invalid user IDs

            return Response({'message': f'Removed users: {removed_users}'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
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
    
    @action(detail=True, methods=['post'], url_path='add-tags')
    def add_tags(self, request, pk=None):
        tag_names = request.data.get('tags', [])
        if not isinstance(tag_names, list):
            return Response({'error': 'Tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        tags = add_or_update_tags(tag_names)
        instance.tags.add(*tags)
        return Response({'message': 'Tags added successfully'})
    
    def remove_tags(self, request, pk=None):
        """
        Remove multiple tags from a taggable model.
        """
        try:
            instance = self.get_object()
            tag_names = request.data.get('tags', [])
            
            if not isinstance(tag_names, list):
                return Response({'error': 'tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

            tags_to_remove = Tag.objects.filter(name__in=tag_names)
            instance.tags.remove(*tags_to_remove)
            return Response({'message': f'Removed tags: {tag_names}'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


class ResourceViewSet(ModelViewSet):
    """
    ViewSet for managing resources linked to forums.
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    @action(detail=False, methods=['get'])
    def filter_by_tags(self, request):
        tags = request.query_params.get('tags', None)
        resources = filter_by_tags(self.queryset, tags)
        serializer = self.get_serializer(resources, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='add-tags')
    def add_tags(self, request, pk=None):
        tag_names = request.data.get('tags', [])
        if not isinstance(tag_names, list):
            return Response({'error': 'Tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        tags = add_or_update_tags(tag_names)
        instance.tags.add(*tags)
        return Response({'message': 'Tags added successfully'})
    def remove_tags(self, request, pk=None):
        """
        Remove multiple tags from a taggable model.
        """
        try:
            instance = self.get_object()
            tag_names = request.data.get('tags', [])
            
            if not isinstance(tag_names, list):
                return Response({'error': 'tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

            tags_to_remove = Tag.objects.filter(name__in=tag_names)
            instance.tags.remove(*tags_to_remove)
            return Response({'message': f'Removed tags: {tag_names}'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class QuizViewSet(ModelViewSet):
    """
    ViewSet for managing quizzes within forums.
    """
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    @action(detail=True, methods=['post'], url_path='submit')
    def submit_quiz(self, request, pk=None):
        """
        Submit answers for a quiz and calculate score.
        """
        quiz = self.get_object()
        answers = request.data.get("answers", [])
        user = request.user.userprofile

        total_questions = quiz.questions.count()
        correct_answers = 0

        for answer_data in answers:
            question_id = answer_data.get("question_id")
            selected_options = answer_data.get("selected_options", {})

            try:
                question = Question.objects.get(id=question_id, quiz=quiz)
                is_correct = question.correct_answer == selected_options
                if is_correct:
                    correct_answers += 1

                Answer.objects.create(
                    question=question,
                    userprofile=user,
                    selected_options=selected_options,
                )
            except Question.DoesNotExist:
                continue

        score = (correct_answers / total_questions) * 100
        return Response({"score": score, "correct_answers": correct_answers}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def filter_by_tags(self, request):
        tags = request.query_params.get('tags', None)
        quizzes = filter_by_tags(self.queryset, tags)
        serializer = self.get_serializer(quizzes, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='my-quizzes')
    def my_quizzes(self, request):
        """
        Retrieve quizzes attempted by the currently authenticated user.
        """
        user = request.user.userprofile  # Assuming `request.user` links to `UserProfile`
        attempted_quizzes = self.queryset.filter(questions__answer__userprofile=user).distinct()
        page = self.paginate_queryset(attempted_quizzes)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(attempted_quizzes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='add-tags')
    def add_tags(self, request, pk=None):
        tag_names = request.data.get('tags', [])
        if not isinstance(tag_names, list):
            return Response({'error': 'Tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        tags = add_or_update_tags(tag_names)
        instance.tags.add(*tags)
        return Response({'message': 'Tags added successfully'})
    def remove_tags(self, request, pk=None):
        """
        Remove multiple tags from a taggable model.
        """
        try:
            instance = self.get_object()
            tag_names = request.data.get('tags', [])
            
            if not isinstance(tag_names, list):
                return Response({'error': 'tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

            tags_to_remove = Tag.objects.filter(name__in=tag_names)
            instance.tags.remove(*tags_to_remove)
            return Response({'message': f'Removed tags: {tag_names}'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
    
    @action(detail=True, methods=['post'], url_path='add-tags')
    def add_tags(self, request, pk=None):
        tag_names = request.data.get('tags', [])
        if not isinstance(tag_names, list):
            return Response({'error': 'Tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        tags = add_or_update_tags(tag_names)
        instance.tags.add(*tags)
        return Response({'message': 'Tags added successfully'})
    def remove_tags(self, request, pk=None):
        """
        Remove multiple tags from a taggable model.
        """
        try:
            instance = self.get_object()
            tag_names = request.data.get('tags', [])
            
            if not isinstance(tag_names, list):
                return Response({'error': 'tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

            tags_to_remove = Tag.objects.filter(name__in=tag_names)
            instance.tags.remove(*tags_to_remove)
            return Response({'message': f'Removed tags: {tag_names}'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
            'is_correct': answer.check_ans()
        })
    @action(detail=False, methods=['get'], url_path='my-answers')
    def my_answers(self, request):
        """
        Retrieve answers given by the currently authenticated user.
        """
        user = request.user.userprofile  # Assuming `request.user` links to `UserProfile`
        user_answers = self.queryset.filter(userprofile=user)
        page = self.paginate_queryset(user_answers)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(user_answers, many=True)
        return Response(serializer.data)

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
    
    @action(detail=True, methods=['post'], url_path='add-tags')
    def add_tags(self, request, pk=None):
        tag_names = request.data.get('tags', [])
        if not isinstance(tag_names, list):
            return Response({'error': 'Tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

        instance = self.get_object()
        tags = add_or_update_tags(tag_names)
        instance.tags.add(*tags)
        return Response({'message': 'Tags added successfully'})
    def remove_tags(self, request, pk=None):
        """
        Remove multiple tags from a taggable model.
        """
        try:
            instance = self.get_object()
            tag_names = request.data.get('tags', [])
            
            if not isinstance(tag_names, list):
                return Response({'error': 'tags must be a list'}, status=status.HTTP_400_BAD_REQUEST)

            tags_to_remove = Tag.objects.filter(name__in=tag_names)
            instance.tags.remove(*tags_to_remove)
            return Response({'message': f'Removed tags: {tag_names}'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['get'], url_path='my-doubts')
    def my_doubts(self, request):
        """
        Retrieve doubts asked by the currently authenticated user.
        """
        user = request.user.userprofile  # Assuming `request.user` links to `UserProfile`
        user_doubts = self.queryset.filter(asked_by=user)
        page = self.paginate_queryset(user_doubts)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(user_doubts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], url_path='resolve')
    def resolve_doubt(self, request, pk=None):
        """
        Mark a doubt as resolved and link an answer message.
        """
        doubt = self.get_object()
        resolved_by = request.user.userprofile
        answer_id = request.data.get("answer_id")

        # Update doubt status
        doubt.status = 'resolved'
        doubt.resolved_by = resolved_by

        # Optionally link a message as the answer
        if answer_id:
            try:
                answer_message = Message.objects.get(id=answer_id)
                doubt.answer = answer_message
            except Message.DoesNotExist:
                return Response({"error": "Answer message not found."}, status=status.HTTP_404_NOT_FOUND)

        doubt.save()
        return Response({"message": "Doubt resolved successfully."}, status=status.HTTP_200_OK)

class TagViewSet(ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    @action(detail=True, methods=['get'], url_path='resources')
    def tagged_resources(self, request, pk=None):
        """
        Retrieve resources associated with a specific tag.
        """
        tag = self.get_object()
        resources = tag.resources.all()

        page = self.paginate_queryset(resources)
        if page is not None:
            serializer = ResourceSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ResourceSerializer(resources, many=True)
        return Response(serializer.data)

class VoteViewSet(ViewSet):
    @action(detail=False, methods=['post'])
    def vote(self, request):
        content_type_id = request.data.get('content_type_id')
        object_id = request.data.get('object_id')
        vote_value = request.data.get('vote')

        if vote_value not in [1, -1]:
            return Response({"error": "Invalid vote value. Use 1 for upvote, -1 for downvote."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            content_type = ContentType.objects.get(id=content_type_id)
            obj = content_type.get_object_for_this_type(id=object_id)

            vote, created = Vote.objects.update_or_create(
                user=request.user.userprofile,
                content_type=content_type,
                object_id=object_id,
                defaults={'vote': vote_value},
            )

            return Response({"message": "Vote registered successfully.", "vote": vote.vote}, status=status.HTTP_200_OK)

        except ContentType.DoesNotExist:
            return Response({"error": "Invalid content type."}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)