# permissions.py
from rest_framework import permissions

class IsVerifiedUser(permissions.BasePermission):
    """Allows access only to verified users."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_verified  # assuming `is_verified` is a field

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