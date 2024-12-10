from rest_framework.routers import DefaultRouter
from .views import ForumViewSet, ResourceViewSet, QuizViewSet, QuestionViewSet, DoubtViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'forums', ForumViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'quizzes', QuizViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'doubts', DoubtViewSet)

urlpatterns = [
    path('', include(router.urls))
]
