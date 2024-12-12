from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    # path('users/recommend/', views.RecommendUsersView.as_view(), name='recommend_users'),
    # path('posts/recommend/', views.RecommendPostsView.as_view(), name='recommend_posts'),
    path('recommend/', views.RecommendationView.as_view(),name='recommendation')
]

router = DefaultRouter()
router.register(r'user-embeddings',views.UserEmbeddingViewSet, basename='userembedding')

urlpatterns += [
    *router.urls,
]