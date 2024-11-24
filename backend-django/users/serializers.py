from rest_framework import serializers
from .models import College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = "__all__"
        read_only_fields = ["college_id", "created_at", "updated_at"]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
        read_only_fields = ["created_at", "updated_at"]

class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = "__all__"
        read_only_fields = ["profile"]

class AlumnusProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumnusProfile
        fields = "__all__"
        read_only_fields = ["profile"]

class CollegeStaffProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeStaffProfile
        fields = "__all__"
        read_only_fields = ["profile"]
