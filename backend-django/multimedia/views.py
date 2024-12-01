from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from users.models import UserProfile


class ChatListView(ListAPIView):
    """List all chats for the authenticated user, with optional filtering by chat_id."""
    serializer_class = ChatSerializer

    def get_queryset(self):
        user_profile = self.request.user.user
        chat_id = self.request.query_params.get('chat_id', None)  # Get the chat_id from query params
        
        # If a specific chat_id is provided, filter by that chat_id
        if chat_id:
            return Chat.objects.filter(participants=user_profile, id=chat_id)
        else:
            # If no chat_id is provided, return all chats for the user
            return Chat.objects.filter(participants=user_profile)


class ChatCreateView(APIView):
    """Create a new chat between users."""
   
    def post(self, request, *args, **kwargs):
        user_profile = request.user.user
        other_user_id = request.data.get('other_user_id')

        other_user = get_object_or_404(UserProfile, id=other_user_id)

        # Check if chat already exists
        chat = Chat.objects.filter(participants=user_profile).filter(participants=other_user).first()
        if chat:
            return Response({'chat_id': chat.id}, status=status.HTTP_200_OK)

        # Create a new chat
        chat = Chat.objects.create()
        chat.participants.add(user_profile, other_user)
        return Response({'chat_id': chat.id}, status=status.HTTP_201_CREATED)


class MessageListView(ListAPIView):
    """Retrieve messages for a specific chat."""
    serializer_class = MessageSerializer
   
    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        user_profile = self.request.user.user
        chat = get_object_or_404(Chat, id=chat_id, participants=user_profile)
        return Message.objects.filter(chat=chat)


class MessageCreateView(CreateAPIView):
    """Send a message in a chat."""
    serializer_class = MessageSerializer
  
    def perform_create(self, serializer):
        chat_id = self.kwargs['chat_id']
        user_profile = self.request.user.user
        chat = get_object_or_404(Chat, id=chat_id, participants=user_profile)
        serializer.save(chat=chat, sender=user_profile)
