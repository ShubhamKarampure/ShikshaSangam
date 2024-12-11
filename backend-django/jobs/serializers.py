from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    posted_by_name = serializers.SerializerMethodField()
    class Meta:
        model = Job
        fields = '__all__'
    
    def get_posted_by_name(self, obj):
        # Safely access `full_name` or fall back to `user` on the `UserProfile`
        if hasattr(obj.posted_by, 'full_name') and obj.posted_by.full_name:
            return obj.posted_by.full_name
        return obj.posted_by.user.username

