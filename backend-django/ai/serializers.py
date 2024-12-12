# Serializer for UserEmbedding
from rest_framework import serializers, viewsets
from .models import UserEmbedding

class UserEmbeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEmbedding
        fields = '__all__'