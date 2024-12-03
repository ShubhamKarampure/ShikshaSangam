from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PostViewSet, CommentViewSet, LikeViewSet, FollowViewSet, ShareViewSet,
    PollViewSet, PollOptionViewSet, PollVoteViewSet, ReplyViewSet
)

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet, basename='comment')
router.register(r'likes', LikeViewSet)
router.register(r'followers', FollowViewSet)
router.register(r'shares', ShareViewSet)
router.register(r'polls', PollViewSet)
router.register(r'poll-options', PollOptionViewSet)
router.register(r'poll-votes', PollVoteViewSet)
router.register(r'replies', ReplyViewSet)

# for path in router.urls:
#     print(path)

urlpatterns = [
    path('', include(router.urls)),
]
