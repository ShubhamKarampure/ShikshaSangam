from rest_framework import serializers
from .models import College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, CollegeAdminProfile

class CollegeAdminProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeAdminProfile
        fields = '__all__'

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class StudentProfileSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        model = StudentProfile
        fields = '__all__'

class AlumnusProfileSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        model = AlumnusProfile
        fields = '__all__'

class CollegeStaffProfileSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all())

    class Meta:
        model = CollegeStaffProfile
        fields = '__all__'
