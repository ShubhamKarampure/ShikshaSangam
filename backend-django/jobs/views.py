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
    

   
    @action(detail=True, methods=['get'])
    def applications(self, request, pk=None):
        """
        Get all applications for a specific job.
        """
        try:
            job = Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

        applications = job.applications.all()  # Access related_name "applications"
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)


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

    def create(self, request, *args, **kwargs):
        """
        Create an application for a job.
        """
        data = request.data

        # Ensure the job exists
        try:
            job = Job.objects.get(id=data.get('job'))
        except Job.DoesNotExist:
            return Response({"error": "Job not found."}, status=status.HTTP_404_NOT_FOUND)

        # Ensure the applicant exists
        try:
            applicant = UserProfile.objects.get(id=data.get('applicant'))
        except UserProfile.DoesNotExist:
            return Response({"error": "Applicant not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if the applicant has already applied for this job
        if Application.objects.filter(job=job, applicant=applicant).exists():
            return Response({"error": "You have already applied for this job."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)