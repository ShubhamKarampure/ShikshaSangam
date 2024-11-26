from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser

# Create your views here.
from rest_framework import viewsets
from .models import Post, Comment, Like, Follow, Share, Poll, PollOption, PollVote
from .serializers import (
    PostSerializer, CommentSerializer, LikeSerializer, FollowSerializer,
    ShareSerializer, PollSerializer, PollOptionSerializer, PollVoteSerializer
)
from users.permissions import IsVerifiedUser, IsCollegeAdmin, IsOwnerPermission

class PostViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Post model
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [IsAuthenticated, IsVerifiedUser] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]

class CommentViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Comment model
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [IsVerifiedUser, IsAuthenticated] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]



class LikeViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Like model
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [IsAuthenticated, IsVerifiedUser] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]

class FollowViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Follow model
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]

class ShareViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Share model
    queryset = Share.objects.all()
    serializer_class = ShareSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]
 # Read access for authenticated users

class PollViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Poll model
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]


class PollOptionViewSet(viewsets.ModelViewSet):
    # Basic CRUD for PollOption model
    queryset = PollOption.objects.all()
    serializer_class = PollOptionSerializer
    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]

class PollVoteViewSet(viewsets.ModelViewSet):
    # Basic CRUD for PollVote model
    queryset = PollVote.objects.all()
    serializer_class = PollVoteSerializer
    def get_permissions(self):
        if self.action == 'create':
            
             permission_classes = [IsAuthenticated,] # [IsAuthenticated]
        elif self.action in ['retrieve', 'list']:
           
            permission_classes =  [IsVerifiedUser, IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            
            permission_classes= [IsOwnerPermission , IsVerifiedUser, IsAuthenticated]
        elif self.action == 'destroy':
            
            permission_classes = [IsOwnerPermission |  IsCollegeAdmin , IsVerifiedUser, IsAuthenticated,]
        return [permission() for permission in permission_classes]
