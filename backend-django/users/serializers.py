from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

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