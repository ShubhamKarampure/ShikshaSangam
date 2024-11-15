"""
URL configuration for backend_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    #JWT

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/', include('allauth.urls')),  # Allauth URLs (login, registration, etc.)

]


'''
- **`allauth.urls`**: This includes all the URLs provided by `django-allauth` for managing user accounts. This includes URLs for login, registration, logout, password reset, and OAuth2 login (including Google login).
    - By adding this line, you automatically enable the paths for login (`/accounts/login/`), logout (`/accounts/logout/`), registration (`/accounts/signup/`), and Google authentication (`/accounts/google/login/`), among others.
    - The main path for Google authentication will be `/accounts/google/login/` and the callback URL that Google uses after successful login is `/accounts/google/login/callback/`.
    
'''