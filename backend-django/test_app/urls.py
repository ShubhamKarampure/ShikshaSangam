from django.urls import path
from .views import TestModelUploadView

urlpatterns = [
    path('upload/', TestModelUploadView.as_view(), name='testmodel-upload'),
]
