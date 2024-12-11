from django.urls import path
from .views import chatbot_query

urlpatterns = [
    path("query/", chatbot_query, name="chatbot_query"),
]
