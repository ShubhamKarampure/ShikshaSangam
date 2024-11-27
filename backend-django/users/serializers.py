from rest_framework import serializers
from .models import User,College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, CollegeAdminProfile

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
    # Embed UserProfile serializer inside StudentProfile serializer
    profile = UserProfileSerializer()

    class Meta:
        model = StudentProfile
        fields = '__all__'

    def create(self, validated_data):
        # Extract user profile data
        profile_data = validated_data.pop('profile')
        # Create the UserProfile first
        user_profile = UserProfile.objects.create(**profile_data)
        # Now create the StudentProfile and link the created user profile
        student_profile = StudentProfile.objects.create(profile=user_profile, **validated_data)
        return student_profile

    def update(self, instance, validated_data):
        # Extract and update user profile data
        profile_data = validated_data.pop('profile', None)
        if profile_data:
            instance.profile = UserProfile.objects.update_or_create(defaults=profile_data, pk=instance.profile.pk)[0]
        
        # Update the rest of the fields in StudentProfile
        return super().update(instance, validated_data)


class AlumnusProfileSerializer(serializers.ModelSerializer):
    # Embed UserProfile serializer inside AlumnusProfile serializer
    profile = UserProfileSerializer()

    class Meta:
        model = AlumnusProfile
        fields = '__all__'

    def create(self, validated_data):
        # Extract user profile data
        profile_data = validated_data.pop('profile')
        # Create the UserProfile first
        user_profile = UserProfile.objects.create(**profile_data)
        # Now create the AlumnusProfile and link the created user profile
        alumnus_profile = AlumnusProfile.objects.create(profile=user_profile, **validated_data)
        return alumnus_profile

    def update(self, instance, validated_data):
        # Extract and update user profile data
        profile_data = validated_data.pop('profile', None)
        if profile_data:
            instance.profile = UserProfile.objects.update_or_create(defaults=profile_data, pk=instance.profile.pk)[0]
        
        # Update the rest of the fields in AlumnusProfile
        return super().update(instance, validated_data)


class CollegeStaffProfileSerializer(serializers.ModelSerializer):
    # Embed UserProfile serializer inside CollegeStaffProfile serializer
    profile = UserProfileSerializer()

    class Meta:
        model = CollegeStaffProfile
        fields = '__all__'

    def create(self, validated_data):
        # Extract user profile data
        profile_data = validated_data.pop('profile')
        # Create the UserProfile first
        user_profile = UserProfile.objects.create(**profile_data)
        # Now create the CollegeStaffProfile and link the created user profile
        college_staff_profile = CollegeStaffProfile.objects.create(profile=user_profile, **validated_data)
        return college_staff_profile

    def update(self, instance, validated_data):
        # Extract and update user profile data
        profile_data = validated_data.pop('profile', None)
        if profile_data:
            instance.profile = UserProfile.objects.update_or_create(defaults=profile_data, pk=instance.profile.pk)[0]
        
        # Update the rest of the fields in CollegeStaffProfile
        return super().update(instance, validated_data)