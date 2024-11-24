from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),  # Login, logout, password reset
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration
    path('accounts/', include('allauth.urls')),  # For Google OAuth
]
