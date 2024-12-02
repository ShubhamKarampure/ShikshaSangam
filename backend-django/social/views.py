from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import action
from .models import Post, Comment, Like, Follow, Share, Poll, PollOption, PollVote, Reply
from .serializers import (
    PostSerializer, CommentSerializer, LikeSerializer, FollowSerializer,ReplySerializer,
    ShareSerializer, PollSerializer, PollOptionSerializer, PollVoteSerializer
)
from users.permissions import IsVerifiedUser, IsCollegeAdmin, IsOwnerPermission
from users.serializers import UserSerializer, UserProfileSerializer
from users.models import UserProfile
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from django.utils.timesince import timesince
from django.contrib.contenttypes.models import ContentType

class PostPagination(PageNumberPagination):
    page_size = 10  # Number of posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class CommentPagination(PageNumberPagination):
    page_size = 5  # Number of comments per page (adjust as necessary)
    page_size_query_param = 'page_size' # ?page_size = x

class ReplyPagination(PageNumberPagination):
    page_size = 3  # Number of replies per page (adjust as necessary)
    page_size_query_param = 'page_size'



class PostViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Post model
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PostPagination

    @action(detail=False, methods=['get']) # GET /posts/college_posts/
    def college_posts(self, request):
        """Get posts from the same college as the current user."""
        user_college = request.user.user.college
        college_posts = Post.objects.filter(userprofile__college=user_college)
        page = self.paginate_queryset(college_posts)
        
        if page is not None:
            response_data = []
            post_content_type = ContentType.objects.get_for_model(Post)
            
            for post in page:
                
                print(post)
                user = post.userprofile
                num_likes =  Like.objects.filter( content_type=post_content_type,object_id=post.id).count()
                num_comments = Comment.objects.filter(post=post).count()
                num_shares = Share.objects.filter(post=post).count()
                num_followers = Follow.objects.filter(followed=user).count()
                time_since_post = timesince(post.created_at)

                post_serializer = self.get_serializer(post)

                response_data.append({
                    'post': post_serializer.data,
                    'user': {
                        'username': user.user.username,
                        'profile_id': user.id,
                        'num_followers': num_followers,
                    },
                    'post_stats': {
                        'likes': num_likes,
                        'comments': num_comments,
                        'shares': num_shares,
                        'time_since_post': time_since_post,
                    },
                    'comments_count': num_comments,
                })

            return Response(response_data)
        
        return Response({
            'detail': 'No posts available.'
        })
    




class CommentViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Comment model
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = CommentPagination

    @action(detail=False, methods=['get'])  # GET /comments/post_comments/{post_pk}/ # Comments for a particular post
    def post_comments(self, request, post_pk=None):
        """
        Paginated comments for a specific post.
        - Includes username, avatar, profile ID, and role for each commenter
        """
        comments = Comment.objects.filter(post__id=post_pk)
        page = self.paginate_queryset(comments)
        if page is not None:
            response_data = [
                {
                    'comment': self.get_serializer(comment).data,
                    'user': {
                        'username': comment.userprofile.user.username,
                        'avatar': comment.userprofile.avatar.url,
                        'profile_id': comment.userprofile.id,
                        'role': comment.userprofile.role,
                    }
                }
                for comment in page
            ]
            return self.get_paginated_response(response_data)

        return Response({
            'detail': 'No comments found for this post.'
        })


class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    pagination_class = ReplyPagination

    @action(detail=False, methods=['get'])  # GET /replies/comment_replies/{comment_pk}/
    def comment_replies(self, request, comment_pk=None):
        """
        Paginated replies for a specific comment.
        - Includes username, avatar, profile ID, and role for each replier
        """
        replies = Reply.objects.filter(comment__id=comment_pk)
        page = self.paginate_queryset(replies)
        if page is not None:
            response_data = [
                {
                    'reply': self.get_serializer(reply).data,
                    'user': {
                        'username': reply.userprofile.user.username,
                        'avatar': reply.userprofile.avatar.url,
                        'profile_id': reply.userprofile.id,
                        'role': reply.userprofile.role,
                    }
                }
                for reply in page
            ]
            return self.get_paginated_response(response_data)

        return Response({
            'detail': 'No replies found for this comment.'
        })


class LikeViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Like model
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

   
class FollowViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Follow model
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    


    @action(detail=False, methods=['get'])  # GET /followers/followers/
    def followers(self, request):
        """
        Get all followers of the current user.
        Includes additional details based on role.
        """
        userprofile = request.user.user
        followers = Follow.objects.filter(followed=userprofile)

        response_data = []
        for follow in followers:
            follower = follow.follower
            if follower.role == 'student' and hasattr(follower, 'studentprofile'):
                response_data.append({
                    'id': follower.id,
                    'full_name': follower.full_name,
                    'avatar_image': follower.avatar_image.url if follower.avatar_image else None,
                    'current_program': follower.studentprofile.current_program,
                    'specialization': follower.studentprofile.specialization,
                    'expected_graduation_year': follower.studentprofile.expected_graduation_year,
                    'location':follower.studentprofile.location,
                    'role': follower.role,
                })
            elif follower.role == 'alumni' and hasattr(follower, 'alumnusprofile'):
                response_data.append({
                    'id': follower.id,
                    'full_name': follower.full_name,
                    'avatar_image': follower.avatar_image.url if follower.avatar_image else None,
                    'specialization': follower.alumnusprofile.specialization,
                    'graduation_year': follower.alumnusprofile.graduation_year,
                    'role': follower.role,
                    'location':follower.alumnusprofile.location,
                })

        return Response(response_data)

    @action(detail=False, methods=['get'])  # GET /followers/following/
    def following(self, request):
        """
        Get all users followed by the current user.
        Includes additional details based on role.
        """
        userprofile = request.user.user
        following = Follow.objects.filter(follower=userprofile)

        response_data = []
        for follow in following:
            followed = follow.followed
            if followed.role == 'student' and hasattr(followed, 'studentprofile'):
                response_data.append({
                    'id': followed.id,
                    'full_name': followed.full_name,
                    'avatar_image': followed.avatar_image.url if followed.avatar_image else None,
                    'current_program': followed.studentprofile.current_program,
                    'specialization': followed.studentprofile.specialization,
                     'location':followed.studentprofile.location,
                    'expected_graduation_year': followed.studentprofile.expected_graduation_year,
                    'role': followed.role,
                })
            elif followed.role == 'alumni' and hasattr(followed, 'alumnusprofile'):
                response_data.append({
                    'id': followed.id,
                    'full_name': followed.full_name,
                    'avatar_image': followed.avatar_image.url if followed.avatar_image else None,
                    'specialization': followed.alumnusprofile.specialization,
                    'graduation_year': followed.alumnusprofile.graduation_year,
                    'location':followed.alumnusprofile.location,
                    'role': followed.role,
                })

        return Response(response_data)
    
    @action(detail=False, methods=['get'])  # GET /followers/userstofollow/
    def userstofollow(self, request):
        """
        Get all users the current user has NOT followed, 
        excluding college_admins and the current user.
        Return alumni and students with relevant details.
        """
        userprofile = request.user.user

        # Get all users that the current user has already followed
        followed_userprofiles = Follow.objects.filter(
            follower=userprofile
        ).values_list('followed', flat=True)

        # Exclude users already followed, the requesting user (self), and college_admins
        userstofollow = UserProfile.objects.exclude(
            id__in=followed_userprofiles
        ).exclude(
            id=userprofile.id
        ).filter(
            Q(role='student') | Q(role='alumni')  # Only students and alumni
        )

        # Fetch relevant fields based on role
        response_data = []
        for user in userstofollow:
            if user.role == 'student' and hasattr(user, 'studentprofile'):
                response_data.append({
                    'id':user.id,
                    'full_name': user.full_name,
                    'avatar_image': user.avatar_image.url if user.avatar_image else None,
                    'current_program': user.studentprofile.current_program,
                    'specialization': user.studentprofile.specialization,
                    'expected_graduation_year': user.studentprofile.expected_graduation_year,
                    'role': user.role,
                })
            elif user.role == 'alumni' and hasattr(user, 'alumnusprofile'):
                response_data.append({
                    'id':user.id,
                    'full_name': user.full_name,
                    'avatar_image': user.avatar_image.url if user.avatar_image else None,
                    'specialization': user.alumnusprofile.specialization,
                    'graduation_year': user.alumnusprofile.graduation_year,
                    'role': user.role,
                })

        return Response(response_data)
    
    @action(detail=False, methods=['get'])  # GET /followers/connections/ # follower + following = connection
    def connections(self, request):
        """
        Get all mutual connections (friends) for the current user.
        A connection is defined as someone the user follows AND is followed back by.
        """
        userprofile = request.user.user

        # Get users followed by the current user
        following = Follow.objects.filter(follower=userprofile).values_list('followed', flat=True)

        # Get users who follow the current user
        followers = Follow.objects.filter(followed=userprofile).values_list('follower', flat=True)

        # Find mutual connections (intersection of following and followers)
        mutual_connections = UserProfile.objects.filter(id__in=set(following).intersection(followers))

        # Prepare response data with additional details
        response_data = []
        for user in mutual_connections:
            if user.role == 'student' and hasattr(user, 'studentprofile'):
                response_data.append({
                    'id': user.id,
                    'full_name': user.full_name,
                    'avatar_image': user.avatar_image.url if user.avatar_image else None,
                    'current_program': user.studentprofile.current_program,
                    'specialization': user.studentprofile.specialization,
                    'expected_graduation_year': user.studentprofile.expected_graduation_year,
                    'role': user.role,
                })
            elif user.role == 'alumni' and hasattr(user, 'alumnusprofile'):
                response_data.append({
                    'id': user.id,
                    'full_name': user.full_name,
                    'avatar_image': user.avatar_image.url if user.avatar_image else None,
                    'specialization': user.alumnusprofile.specialization,
                    'graduation_year': user.alumnusprofile.graduation_year,
                    'role': user.role,
                })

        return Response(response_data)
    
    @action(detail=False, methods=['get'])  # GET /follows/summary/ # returns no of followers, following, and connections
    def summary(self, request):
        """
        Get counts of followers, following, and connections for the current user.
        """
        userprofile = request.user.user

        # Count followers
        followers_count = Follow.objects.filter(followed=userprofile).count()

        # Count following
        following_count = Follow.objects.filter(follower=userprofile).count()

        # Count connections (mutual follows)
        following = Follow.objects.filter(follower=userprofile).values_list('followed', flat=True)
        followers = Follow.objects.filter(followed=userprofile).values_list('follower', flat=True)
        connections_count = len(set(following).intersection(followers))

        # Prepare response
        response_data = {
            'followers_count': followers_count,
            'following_count': following_count,
            'connections_count': connections_count,
        }

        return Response(response_data)

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

