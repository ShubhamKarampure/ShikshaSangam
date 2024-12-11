from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Job, Application
from .serializers import JobSerializer
from rest_framework import viewsets, status
from django.db.models import Q
from .models import Application, Job
from .serializers import ApplicationSerializer, JobSerializer  # Assuming you have these serializers
from users.models import UserProfile


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    



    # Custom action to filter by title
    @action(detail=False, methods=['get'])
    def filter_by_title(self, request):
        title = request.query_params.get('title', None)
        if title:
            jobs = Job.objects.filter(title__icontains=title)
            serializer = self.get_serializer(jobs, many=True)
            return Response(serializer.data)
        return Response({'error': 'Title parameter is required'}, status=400)

    # Custom action to filter by company
    @action(detail=False, methods=['get'])
    def filter_by_company(self, request):
        company = request.query_params.get('company', None)
        if company:
            jobs = Job.objects.filter(company__icontains=company)
            serializer = self.get_serializer(jobs, many=True)
            return Response(serializer.data)
        return Response({'error': 'Company parameter is required'}, status=400)





class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        """
        Filters applications based on the logged-in user's role:
        - If the user is a job poster, show applications for their jobs.
        - If the user is an applicant, show their own applications.
        """
        user_profile = self.request.user.user  # Adjust based on your user model structure
        if user_profile.role == "college_staff":  # Assuming job posters are staff
            return self.queryset.filter(job__posted_by=user_profile)
        else:
            return self.queryset.filter(applicant=user_profile)

    @action(detail=True, methods=["post"], url_path="upload-resume")
    def upload_resume(self, request, pk=None):
        """
        If the applicant's user profile doesn't have a resume, the uploaded resume for this job
        becomes the user's default resume.
        """
        try:
            application = self.get_object()

            # Ensure the current user is the applicant
            if application.applicant != request.user.user:
                return Response(
                    {"error": "You are not authorized to update this application."},
                    status=status.HTTP_403_FORBIDDEN,
                )

            resume = request.data.get("resume")
            if not resume:
                return Response(
                    {"error": "Resume file is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Update the application's resume
            application.resume = resume
            application.save()

            # Set the resume to the user's profile if not already present
            user_profile = application.applicant
            if not user_profile.resume:
                user_profile.resume = resume
                user_profile.save()

            return Response(
                {"message": "Resume uploaded successfully."},
                status=status.HTTP_200_OK,
            )

        except Application.DoesNotExist:
            return Response(
                {"error": "Application not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)