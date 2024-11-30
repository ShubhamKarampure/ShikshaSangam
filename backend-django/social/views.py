from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Post, Comment, Like, Follow, Share, Poll, PollOption, PollVote
from .serializers import (
    PostSerializer, CommentSerializer, LikeSerializer, FollowSerializer,
    ShareSerializer, PollSerializer, PollOptionSerializer, PollVoteSerializer
)
from users.permissions import IsVerifiedUser, IsCollegeAdmin, IsOwnerPermission
from users.serializers import UserSerializer
from users.models import UserProfile

class PostViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Post model
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=False, methods=['get']) # GET /posts/college_posts/
    def college_posts(self, request):
        """Get posts from the same college as the current user."""
        user_college = request.user.userprofile.college
        college_posts = Post.objects.filter(userprofile__college=user_college)
        serializer = self.get_serializer(college_posts, many=True)
        return Response(serializer.data)



class CommentViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Comment model
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer




class LikeViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Like model
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


   
class FollowViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Follow model
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer

    @action(detail=False, methods=['get']) # GET /follows/followers/ → Returns all followers of the current user.
    def followers(self, request):
        """Get all followers of the current user."""
        userprofile = request.user.userprofile
        followers = Follow.objects.filter(followed=userprofile)  # People following the user
        serializer = FollowSerializer(followers, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get']) # GET /follows/following/ → Returns all users followed by the current user
    def following(self, request):
        """Get all users followed by the current user."""
        userprofile = request.user.userprofile
        following = Follow.objects.filter(follower=userprofile)  # People the user follows
        serializer = FollowSerializer(following, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])  # GET /follows/userstofollow/
    def userstofollow(self, request):
        """Get all users the current user has NOT followed."""
        userprofile = request.user.userprofile

        # Get all users that the current user has already followed
        followed_userprofiles = Follow.objects.filter(follower=userprofile).values_list('followed', flat=True)

        # Exclude those users from the total UserProfiles
        userstofollow = UserProfile.objects.exclude(id__in=followed_userprofiles).exclude(id=userprofile.id)
        
        # Serialize the result
        serializer = UserSerializer(userstofollow, many=True, context={'request': request})
        return Response(serializer.data)

 

class ShareViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Share model
    queryset = Share.objects.all()
    serializer_class = ShareSerializer

    # def get_permissions(self):
    #     if self.action == 'create':
            
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
           
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
            
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
            
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]
 # Read access for authenticated users

class PollViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Poll model
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    # def get_permissions(self):
    #     if self.action == 'create':
    # def get_permissions(self):
    #     if self.action == 'create':
            
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
           
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
            
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
            
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]


class PollOptionViewSet(viewsets.ModelViewSet):
    # Basic CRUD for PollOption model
    queryset = PollOption.objects.all()
    serializer_class = PollOptionSerializer
    # def get_permissions(self):
    #     if self.action == 'create':
    # def get_permissions(self):
    #     if self.action == 'create':
            
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
    #          permission_classes = [] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
           
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
            
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
            
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]

class PollVoteViewSet(viewsets.ModelViewSet):
    # Basic CRUD for PollVote model
    queryset = PollVote.objects.all()
    serializer_class = PollVoteSerializer
    # def get_permissions(self):
    #     if self.action == 'create':
    # def get_permissions(self):
    #     if self.action == 'create':
            
    #          permission_classes = [IsAuthenticated,] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
    #          permission_classes = [IsAuthenticated,] # [IsAuthenticated]
    #     elif self.action in ['retrieve', 'list']:
           
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
    #         permission_classes =  [IsVerifiedUser, IsAuthenticated]
    #     elif self.action in ['update', 'partial_update']:
            
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
    #         permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
    #     elif self.action == 'destroy':
            
    #         permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
    #     return [permission() for permission in permission_classes]

