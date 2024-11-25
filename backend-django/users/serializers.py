from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, StudentProfile, AlumnusProfile, CollegeAdminProfile, College

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'role')

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'password2', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        # Validate that passwords match
        if data['password'] != data.get('password2'):
            raise serializers.ValidationError("Passwords must match.")
        
        # Check for duplicate email
        if User.objects.filter(email=data['email']).exists() or User.objects.filter(username=data['username']).exists() :
            raise serializers.ValidationError("A user with this email already exists.")
        
        # Check for duplicate username
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        
        return data

    def create(self, validated_data):
        validated_data.pop('password2')  # Remove password2 from validated data
        
        # Create the user instance
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        # Check if user exists
        user = User.objects.filter(email=email).first()
        if user and user.check_password(password):
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            return {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
            }

        # Raise error for invalid credentials
        raise serializers.ValidationError({"detail": "Invalid email or password."})
    

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'role']


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = StudentProfile  # Can also be used for AlumnusProfile or CollegeAdminProfile
        fields = [
            'user',
            'full_name',
            'avatar_image',
            'banner_image',
            'bio',
            'contact_number',
            'specialization',
            'location',
            'social_links',
            'resume_url',
            'preferences',
            'connections',
            'is_verified',
            'created_at',
            'updated_at',
        ]


class StudentProfileSerializer(UserProfileSerializer):
    class Meta(UserProfileSerializer.Meta):
        model = StudentProfile
        fields = UserProfileSerializer.Meta.fields + [
            'enrollment_year',
            'current_program',
            'expected_graduation_year',
        ]


class AlumnusProfileSerializer(UserProfileSerializer):
    class Meta(UserProfileSerializer.Meta):
        model = AlumnusProfile
        fields = UserProfileSerializer.Meta.fields + [
            'graduation_year',
            'current_employment',
            'career_path',
        ]


class CollegeAdminProfileSerializer(UserProfileSerializer):
    managed_college = CollegeSerializer()

    class Meta(UserProfileSerializer.Meta):
        model = CollegeAdminProfile
        fields = UserProfileSerializer.Meta.fields + [
            'managed_college',
        ]
