from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer

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
