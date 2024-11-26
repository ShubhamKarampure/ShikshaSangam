from rest_framework import permissions
from .models import CollegeAdminProfile, StudentProfile, AlumnusProfile, CollegeStaffProfile, College, UserProfile

class IsVerifiedUser(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user.is_authenticated:
            return False

        userprofile = getattr(user, 'userprofile', None)
        if not userprofile:
            return False

        # Check if the user has any verified profile (admin, student, alumni, or staff)
        for role_profile in ['collegeadminprofile', 'studentprofile', 'alumnusprofile', 'collegestaffprofile']:
            profile = getattr(userprofile, role_profile, None)
            if profile and profile.is_verified:
                return True
        return False
class IsCollegeAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        userprofile = getattr(request.user, 'userprofile', None)
        admin_profile = getattr(userprofile, 'collegeadminprofile', None)
        return bool(admin_profile and admin_profile.is_verified)

class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        userprofile = getattr(request.user, 'userprofile', None)
        student_profile = getattr(userprofile, 'studentprofile', None)
        return bool(student_profile and student_profile.is_verified)

class IsAlumni(permissions.BasePermission):
    def has_permission(self, request, view):
        userprofile = getattr(request.user, 'userprofile', None)
        alumni_profile = getattr(userprofile, 'alumnusprofile', None)
        return bool(alumni_profile and alumni_profile.is_verified)

class IsCollegeStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        userprofile = getattr(request.user, 'userprofile', None)
        staff_profile = getattr(userprofile, 'collegestaffprofile', None)
        return bool(staff_profile and staff_profile.is_verified)

class IsOwnerPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):

        if isinstance(obj, UserProfile):
            return  obj.user == request.user

        return obj.userprofile.user == request.user

class IsUserOfCollege(permissions.BasePermission):
    """
    Custom permission to check if the user is a College Admin of the specific College.
    """
    
    def has_object_permission(self, request, view, obj):
        """
        Check if the logged-in user is a College Admin of the college associated with the given college object.
        """
        # Ensure the user is authenticated and has a UserProfile linked to them
        if not request.user.is_authenticated or not hasattr(request.user, 'userprofile'):
            return False
        
        # Get the user's college from their UserProfile
        user_college = request.user.userprofile.college
        
        # Ensure the College object (`obj`) is available and has the `college` attribute
        if not obj.college:
            return False
        
        # If the object is a College object, compare its id with the user's college id
        if isinstance(obj, College):
            return user_college.id == obj.id
        
        # Ensure the College object (`obj`) is available and has the `college` attribute (for non-College objects)
        if hasattr(obj, 'college') and obj.college:
            return user_college == obj.college

