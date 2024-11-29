import pandas as pd
from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, UploadedFile

def process_user_data(file_url, college):
    """
    Reads a file from the given URL and creates users, user profiles, and role-specific profiles.
    """
    try:
        # Read the file
        if file_url.endswith('.csv'):
            df = pd.read_csv(file_url)
        elif file_url.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file_url)
        else:
            raise ValueError("Unsupported file format. Please upload CSV or Excel files.")

        # Iterate through rows
        for _, row in df.iterrows():
            username = row['username']
            email = row['email']
            password = row.get('password', User.objects.make_random_password())
            role = row['role']

            # Create User
            user, created = User.objects.get_or_create(
                username=username,
                email=email,
                defaults={'password': password}
            )

            if created:
                # Create UserProfile
                user_profile = UserProfile.objects.create(user=user, college=college)

                # Create role-specific profiles
                if role == 'student':
                    StudentProfile.objects.create(userprofile=user_profile, additional_data=row.get('additional_data', ''))
                elif role == 'alumnus':
                    AlumnusProfile.objects.create(userprofile=user_profile, additional_data=row.get('additional_data', ''))
                elif role == 'staff':
                    CollegeStaffProfile.objects.create(userprofile=user_profile, additional_data=row.get('additional_data', ''))
                else:
                    raise ValueError(f"Unsupported role: {role}")

        return "Profiles created successfully."
    except Exception as e:
        return f"Error processing file: {e}"

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_csv_files(request):
    """
    Handle CSV file uploads, store them in Cloudinary, and process user data.
    """
    user = request.user
    user_profile = user.userprofile

    # Ensure only admins can upload
    if not hasattr(user_profile, "collegeadminprofile"):
        return JsonResponse({"error": "Only college admins can upload user data."}, status=403)

    college = user_profile.college

    if 'files' not in request.FILES:
        return JsonResponse({"error": "No files provided."}, status=400)

    files = request.FILES.getlist('files')
    results = []

    try:
        for file in files:
            # Save to Cloudinary
            uploaded_file = UploadedFile.objects.create(
                user=user,
                file=file,
                file_name=file.name
            )

            # Process the file to create users and profiles
            result = process_user_data(uploaded_file.file.url, college)
            results.append({"file_name": uploaded_file.file_name, "result": result})

        return JsonResponse({"results": results}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
