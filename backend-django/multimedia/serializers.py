from rest_framework import serializers
from .models import Chat, Message
from users.models import UserProfile

from rest_framework import serializers

class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()  
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = ['id', 'participants', 'created_at', 'updated_at', 'last_message']

    def get_participants(self, obj):
        # Get the current user from context
        current_user = self.context.get('request').user.user

        participants_data = []
        for participant in obj.participants.all():
            if participant != current_user:
                participants_data.append({
                    'full_name': participant.full_name,
                    'avatar_image': participant.avatar_image.url if participant.avatar_image else None
                })
        return participants_data

    def get_last_message(self, obj):
        last_message = obj.last_message()
        if last_message:
            return {
                'id': last_message.id,
                'content': last_message.content,
                'sender': last_message.sender.full_name, 
                'timestamp': last_message.timestamp
            }
        return None


class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.SerializerMethodField()  # Custom field for sender

    class Meta:
        model = Message
        fields = ['id', 'chat', 'sender', 'content', 'timestamp', 'is_read', 'media']

    def get_sender(self, obj):
        # Display full_name of the sender
        return obj.sender.full_name
