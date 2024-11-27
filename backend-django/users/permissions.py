# permissions.py
from rest_framework import permissions
from .models import CollegeAdminProfile

class IsAuthenticatedUser(permissions.BasePermission):
    """Allows access only to verified users."""
    def has_permission(self, request, view):
        return request.user.is_authenticated 
    
class IsVerifiedCollegeAdmin(permissions.BasePermission):
    """
    Custom permission to only allow verified College Admins to create a college.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if request.user.is_authenticated:
            try:
                # Check if the user has a CollegeAdminProfile and is verified
                college_admin_profile = request.user.college_admin
                if college_admin_profile.role == 'admin' and college_admin_profile.is_verified:
                    return True
            except CollegeAdminProfile.DoesNotExist:
                return False  # User doesn't have a CollegeAdminProfile or is not an admin
        return False
    
class IsCollegeAdminOrReadOnly(permissions.BasePermission):
    """Allows college-admin to access their own profile, and read-only access for others."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True  # Read-only access
        return obj.user == request.user and request.user.is_student  

class IsStudentOrReadOnly(permissions.BasePermission):
    """Allows students to access their own profile, and read-only access for others."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True  # Read-only access
        return obj.user == request.user and request.user.is_student  # Assuming `is_student` attribute

class IsAlumnusOrReadOnly(permissions.BasePermission):
    """Allows alumni to access their own profile, and read-only access for others."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user and request.user.is_alumnus  # Assuming `is_alumnus` attribute

class IsCollegeStaffOrReadOnly(permissions.BasePermission):
    """Allows college staff to access their own profile, and read-only access for others."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user and request.user.is_staff  # Assuming `is_staff` attribute


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow only the owner of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read-only permissions for safe methods (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions only for the owner of the profile
        return obj.user == request.user