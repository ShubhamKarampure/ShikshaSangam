from django.urls import path
from .views import ChatListView, ChatCreateView, MessageListView, MessageCreateView
from .views import ClearChatView

urlpatterns = [
    path('chats/', ChatListView.as_view(), name='chat-list'),
    path('chats/create/', ChatCreateView.as_view(), name='chat-create'),
    path('chats/<int:chat_id>/messages/', MessageListView.as_view(), name='message-list'),
    path('chats/<int:chat_id>/messages/create/', MessageCreateView.as_view(), name='message-create'),
    path('chats/<int:chat_id>/clear/', ClearChatView.as_view(), name='clear_chat'),
]
