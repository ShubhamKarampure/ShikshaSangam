from rest_framework import serializers
from .models import College, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, CollegeAdminProfile, UploadedFile
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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

class MiniUserProfileSerializer(serializers.ModelSerializer):
      # Custom field
    username = serializers.CharField(source='user.username')  # Pulls username from related User model
    avatar = serializers.CharField(source='avatar.url', allow_null=True) 
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'avatar', 'role', 'full_name']

class CollegeSerializer(serializers.ModelSerializer):
    admin_user_id = serializers.IntegerField(write_only=True)  # Field to pass the admin user's ID

    class Meta:
        model = College
        fields = '__all__'

    def create(self, validated_data):
        # Extract the admin_user_id from the validated data
        admin_user_id = validated_data.pop('admin_user_id')

        try:
            # Fetch the admin user
            admin_user = User.objects.get(id=admin_user_id)
        except User.DoesNotExist:
            raise ValidationError({"admin_user_id": "The admin user does not exist."})

        # Validate if the user has a UserProfile and is a college_admin
        try:
            user_profile = admin_user.user  # related_name="user" in the UserProfile model
            if user_profile.role != 'college_admin':
                raise ValidationError({"admin_user_id": "The user is not a college admin."})
        except UserProfile.DoesNotExist:
            raise ValidationError({"admin_user_id": "The admin user does not have a profile."})

        # Create the College instance
        college = College.objects.create(**validated_data)

        # Assign the college to the user's profile
        user_profile.college = college
        user_profile.save()

        return college

class UserProfileOnlySerializer(serializers.ModelSerializer):
      class Meta:
        model = UserProfile
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=UserProfile.ROLE_CHOICES)
    college_id = serializers.IntegerField(required=False)
    
    # Role-specific fields (e.g., for Student, add year, program, etc.)
    enrollment_year = serializers.IntegerField(required=False)
    current_program = serializers.CharField(max_length=100, required=False)
    expected_graduation_year = serializers.IntegerField(required=False)
    specialization = serializers.CharField(max_length=100, required=False)

    class Meta:
        model = UserProfile
        fields = ['id','user', 'role', 'status', 'college_id', 'full_name', 'bio', 'avatar_image', 'banner_image', 'contact_number', 'location', 'social_links', 
                  'experience','project','skills','enrollment_year', 'current_program', 'expected_graduation_year', 'specialization']

    def validate(self, data):
        role = data.get('role')

        # Validate role-specific fields
        if role == 'student':
            pass
            # if not data.get('enrollment_year') or not data.get('current_program'):
            #     raise serializers.ValidationError("Enrollment year and current program are required for students.")
        elif role == 'college_admin':
            # Any specific validation for College Admin can go here
            pass
        elif role == 'alumni':
            # Any specific validation for Alumnus can go here
            pass
        elif role == 'college_staff':
            # Any specific validation for College Staff can go here
            pass

        return data

    def create(self, validated_data):
        print(validated_data)
        role = validated_data['role']
        college_id = validated_data.get('college_id', None)
        user = validated_data['user']  

        # Create UserProfile
        user_profile = UserProfile.objects.create(
            user=user,
            role=role,
            college_id=college_id,
            full_name=validated_data.get('full_name'),
            bio=validated_data.get('bio'),
            avatar_image=validated_data.get('avatar_image'),
            banner_image=validated_data.get('banner_image'),
            contact_number=validated_data.get('contact_number'),
            location=validated_data.get('location'),
            social_links=validated_data.get('social_links', {}),
            project=validated_data.get('social_links', {}),
            skills =validated_data.get('social_links', {}),
        )

        # Create specific profile based on role and additional role-specific fields
        if role == 'college_admin':
            CollegeAdminProfile.objects.create(profile=user_profile)
        elif role == 'student':
            student_data = {
                'profile': user_profile,
                'enrollment_year': validated_data.get('enrollment_year'),
                'current_program': validated_data.get('current_program'),
                'expected_graduation_year': validated_data.get('expected_graduation_year'),
                'specialization': validated_data.get('specialization')
            }
            StudentProfile.objects.create(**student_data)
        elif role == 'alumni':
            alumnus_data = {
                'profile': user_profile,
                'graduation_year': validated_data.get('graduation_year'),
                'current_employment': validated_data.get('current_employment', {}),
                'career_path': validated_data.get('career_path'),
                'specialization': validated_data.get('specialization'),
            }
            AlumnusProfile.objects.create(**alumnus_data)
        elif role == 'college_staff':
            college_staff_data = {
                'profile': user_profile,
                'position': validated_data.get('position'),
                'department': validated_data.get('department'),
            }
            CollegeStaffProfile.objects.create(**college_staff_data)

        return user_profile
    
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


class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'file_name', 'uploaded_at']