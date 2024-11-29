import pandas as pd
from django.contrib.auth.models import User
from .models import UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile
from django.http import JsonResponse
from .models import UploadedFile
import cloudinary.uploader

def upload_csv_files(request):
    """Endpoint to handle CSV file uploads."""
    if request.method == 'POST':
        if 'files' not in request.FILES:
            return JsonResponse({"error": "No files provided."}, status=400)

        uploaded_files = []
        results = []
        user = request.user
        college = user.userprofile.college

        try:
            for file in request.FILES.getlist('files'):
                # Upload to Cloudinary
                upload_result = cloudinary.uploader.upload(file, resource_type="raw")
                file_url = upload_result['url']
                file_name = file.name

                # Save metadata in UploadedFile model
                uploaded_file = UploadedFile.objects.create(
                    user=user,
                    file=file_url,
                    file_name=file_name
                )
                 
                result = process_user_data(file_url, college)
                results.append({"file_name": file_name, "result": result})

                uploaded_files.append({"file_name": file_name, "url": file_url})

            return JsonResponse({"uploaded_files": uploaded_files, "results":results}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)


def process_user_data(file_path, college):
    """Read a file and create users, user profiles, and role-specific profiles."""
    try:
        # Check file type and read accordingly
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)  # Reading CSV
        elif file_path.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file_path)  # Reading Excel
        else:
            raise ValueError("Unsupported file format. Please upload CSV or Excel files.")
        
        # Loop through rows and create users and profiles
        for _, row in df.iterrows():
            username = row['username']
            email = row['email']
            password = row.get('password', User.objects.make_random_password())  # Random password if not provided
            role = row['role']  # Role: 'student', 'alumnus', 'staff', etc.

            # Create User
            user, created = User.objects.get_or_create(
                username=username,
                email=email,
                defaults={'password': password}
            )

            if created:
                # Create UserProfile
                user_profile = UserProfile.objects.create(user=user, college=college) 

                # Create role-specific profile and link it to the UserProfile
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



# from django.http import JsonResponse
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from .models import UploadedFile, UserProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile
# from cloudinary.uploader import upload
# from django.contrib.auth.models import User
# import pandas as pd

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_and_process_files(request):
    """Handle file uploads and process user data."""
    user = request.user
    user_profile = user.userprofile

    # Ensure the user is an admin or has permission to upload
    if not hasattr(user_profile, "collegeadminprofile"):
        return JsonResponse({"error": "Only college admins can upload user data."}, status=403)

    college = user_profile.college

    if 'files' not in request.FILES:
        return JsonResponse({"error": "No files provided."}, status=400)

    uploaded_files = request.FILES.getlist('files')
    results = []

    try:
        for file in uploaded_files:
            # Upload to Cloudinary
            upload_result = upload(file, resource_type="raw")
            file_url = upload_result['url']
            file_name = file.name

            # Save metadata in UploadedFile model
            UploadedFile.objects.create(
                user=user,
                file=file_url,
                file_name=file_name
            )

            # Process the file to create users and profiles
            result = process_user_data(file_url, college)
            results.append({"file_name": file_name, "result": result})

        return JsonResponse({"results": results}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
