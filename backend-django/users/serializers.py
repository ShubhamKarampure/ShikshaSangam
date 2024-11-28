from rest_framework import serializers
from .models import User,College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, CollegeAdminProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'is_active', 'date_joined']  # Customize the fields as necessary

    def validate_role(self, value):
        """Ensure role is valid"""
        if value not in dict(User.ROLE_CHOICES).keys():
            raise serializers.ValidationError("Invalid role")
        return value
    
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
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
    class Meta:
        model = StudentProfile
        fields = '__all__'

class AlumnusProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumnusProfile
        fields = '__all__'

class CollegeStaffProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeStaffProfile
        fields = '__all__'
