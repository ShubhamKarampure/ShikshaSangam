from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import Post, Comment, Like, Follow, Share, Poll, PollOption, PollVote, Reply
from .serializers import (
    PostSerializer, CommentSerializer, LikeSerializer, FollowSerializer,ReplySerializer,
    ShareSerializer, PollSerializer, PollOptionSerializer, PollVoteSerializer
)
from users.models import UserProfile
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from django.utils.timesince import timesince
from django.contrib.contenttypes.models import ContentType
from django.db import transaction
from rest_framework.pagination import LimitOffsetPagination
from ai.vectordb import recommend_posts, get_user_embedding, store_post_embedding, generate_post_embedding, get_post_embedding
from ai.models import UserEmbedding, PostEmbedding


#GET /social/posts/list_posts/?limit=5&offset=10 example for limit offset

class PostOffsetPagination(LimitOffsetPagination):
    default_limit = 10  # Number of items per page by default
    max_limit = 100  # Maximum number of items allowed per request


class CommentPagination(PageNumberPagination):
    page_size = 5  # Number of comments per page (adjust as necessary)
    page_size_query_param = 'page_size' # ?page_size = x
    max_page_size = 100  # Maximum number of comments per page

class ReplyPagination(PageNumberPagination):
    page_size = 3  # Number of replies per page (adjust as necessary)
    page_size_query_param = 'page_size'



class PostViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Post model
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PostOffsetPagination

    @action(detail=False, methods=['get'])  # GET /social/posts/list_posts/
    def list_posts(self, request):
        """List all posts with their related data."""
        all_posts = Post.objects.all().order_by('-created_at')
        page = self.paginate_queryset(all_posts)

        if page is not None:
            return self._get_paginated_post_data(page)

        return Response({"detail": "No posts available."})

    @action(detail=False, methods=['get'])  # GET /social/posts/shared_to_me/
    def shared_to_me(self, request):
        """List posts shared to the current user."""
        user_profile = request.user.userprofile
        shared_to_me_posts = Post.objects.filter(
            shares__shared_to=user_profile
        ).distinct().order_by('-created_at')
        page = self.paginate_queryset(shared_to_me_posts)

        if page is not None:
            return self._get_paginated_post_data(page)

        return Response({"detail": "No shared posts available."})

    @action(detail=False, methods=['get'])  # GET /social/posts/shared_by_me/
    def shared_by_me(self, request):
        """List posts shared by the current user."""
        user_profile = request.user.userprofile
        shared_by_me_posts = Post.objects.filter(
            shares__shared_by=user_profile
        ).distinct().order_by('-created_at')
        page = self.paginate_queryset(shared_by_me_posts)

        if page is not None:
            return self._get_paginated_post_data(page)

        return Response({"detail": "No shared posts available."})
    
    @action(detail=False, methods=['get'])  # GET /social/posts/recommend_posts/
    def recommended_posts(self, request):
        """List posts shared by the current user."""
        user_profile = request.user.user

        query_embedding = get_user_embedding(user_profile)
        # print(query_embedding)
        posts = recommend_posts(query_embedding=query_embedding)
        page = self.paginate_queryset(posts)

        if page is not None:
            return self._get_paginated_post_data(page)

        return Response({"detail": "No shared posts available."})
    


    def _get_paginated_post_data(self, posts):
        """Helper function to format paginated post data."""
        response_data = []
        post_content_type = ContentType.objects.get_for_model(Post)

        for post in posts:
            user = post.userprofile
            num_followers = Follow.objects.filter(followed=user).count()
            num_likes = Like.objects.filter(content_type=post_content_type, object_id=post.id).count()
            num_comments = Comment.objects.filter(post=post).count()
            num_shares = Share.objects.filter(post=post).count()
            time_since_post = timesince(post.created_at)
              # Check if the current user has liked this post
            has_liked = Like.objects.filter(
                content_type=post_content_type,
                object_id=post.id,
                userprofile=self.request.user.user
            ).exists()
            post_serializer = self.get_serializer(post)

            response_data.append({
                'post': post_serializer.data,
                'user': {
                    'username': user.user.username,
                    'profile_id': user.id,
                    'avatar':user.avatar_image.url if user.avatar_image else None,
                    'num_followers': num_followers,
                    'bio': user.bio
                },
                'post_stats': {
                    'likes': num_likes,
                    'comments': num_comments,
                    'shares': num_shares,
                    'time_since_post': time_since_post,
                },
                'comments_count': num_comments,
                'is_liked': has_liked, 
                
            })

        return self.get_paginated_response(response_data)

    @action(detail=False, methods=['get']) # GET /posts/college_posts/
    def college_posts(self, request):
        """Get posts from the same college as the current user."""
        user_college = request.user.user.college
        college_posts = Post.objects.filter(userprofile__college=user_college).order_by('-created_at')
        page = self.paginate_queryset(college_posts)

        
        
        if page is not None:
            response_data = []
            post_content_type = ContentType.objects.get_for_model(Post)
            
            for post in page:
                
                user = post.userprofile
                num_likes =  Like.objects.filter( content_type=post_content_type,object_id=post.id).count()
                num_comments = Comment.objects.filter(post=post).count()
                num_shares = Share.objects.filter(post=post).count()
                num_followers = Follow.objects.filter(followed=user).count()
                time_since_post = timesince(post.created_at)
                  # Check if the current user has liked this post
                has_liked = Like.objects.filter(
                    content_type=post_content_type,
                    object_id=post.id,
                    userprofile=self.request.user.user
                ).exists()

                post_serializer = self.get_serializer(post)

                response_data.append({
                    'post': post_serializer.data,
                    'user': {
                        'username': user.user.username,
                        'profile_id': user.id,
                        'num_followers': num_followers,
                        'avatar':user.avatar_image.url if user.avatar_image else None,
                        'bio': user.bio
                    },
                    'post_stats': {
                        'likes': num_likes,
                        'comments': num_comments,
                        'shares': num_shares,
                        'time_since_post': time_since_post,
                    },
                    'comments_count': num_comments,
                    'is_liked':has_liked,
                })

            return self.get_paginated_response(response_data)
        
        return Response({
            'detail': 'No posts available.'
        })
    
    @action(detail=True, methods=['get'], url_path='details', url_name='details')
    def get_post_details(self, request, pk=None):
        """
        Custom action to fetch detailed data for a single post.
        """
        try:
            post = self.get_object()  # Fetch the post instance using the primary key
        except Post.DoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

        # Prepare content type for the Post model
        post_content_type = ContentType.objects.get_for_model(Post)

        # Extract associated user profile
        user = post.userprofile

        # Calculate stats
        num_followers = Follow.objects.filter(followed=user).count()
        num_likes = Like.objects.filter(content_type=post_content_type, object_id=post.id).count()
        num_comments = Comment.objects.filter(post=post).count()
        num_shares = Share.objects.filter(post=post).count()
        time_since_post = timesince(post.created_at)
          # Check if the current user has liked this post
        has_liked = Like.objects.filter(
            content_type=post_content_type,
            object_id=post.id,
            user=self.request.user
        ).exists()

        # Serialize the post
        post_serializer = self.get_serializer(post)

        # Prepare response data
        response_data = {
            'post': post_serializer.data,
            'user': {
                'username': user.user.username,
                'profile_id': user.id,
                'avatar': user.avatar_image.url if user.avatar_image else None,
                'num_followers': num_followers,
                'bio': user.bio
            },
            'post_stats': {
                'likes': num_likes,
                'comments': num_comments,
                'shares': num_shares,
                'time_since_post': time_since_post,
            },
            'comments_count': num_comments,
            'is_liked': has_liked,
        }

        return Response(response_data, status=status.HTTP_200_OK)
    


class CommentViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Comment model
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    pagination_class = CommentPagination

    @action(detail=False, methods=['get'], url_path='post_comments/(?P<post_pk>\d+)')  # GET /comments/post_comments/{post_pk}/ # Comments for a particular post
    def post_comments(self, request, post_pk=None):


# Get ContentTypes for your models
        
        """
        Paginated comments for a specific post.
        - Includes username, avatar, profile ID, and role for each commenter
        """
        if not post_pk:
            return Response({'detail': 'Post pk is required.'}, status=400)
        
        comments = Comment.objects.filter(post__id=post_pk).order_by('-created_at')
        page = self.paginate_queryset(comments)
        comment_content_type = ContentType.objects.get_for_model(Comment)
       
        if page is not None:
            
            response_data = [
                {
                    'comment': self.get_serializer(comment).data,
                    'user': {
                        'username': comment.userprofile.user.username,
                        'avatar': comment.userprofile.avatar_image.url if comment.userprofile.avatar_image else None,
                        'profile_id': comment.userprofile.id,
                        'role': comment.userprofile.role,
                    },

                    'likes_count': Like.objects.filter(content_type=comment_content_type, object_id=comment.id).count(),  # Count likes for this comment
                    'replies_count': Reply.objects.filter(comment=comment).count(),  # Count replies for this comment
                    'is_liked': Like.objects.filter(content_type=comment_content_type, object_id=comment.id,userprofile=self.request.user.user).exists()
                    
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

    @action(detail=False, methods=['get'], url_path='comment_replies/(?P<comment_pk>\d+)')  # GET /replies/comment_replies/{comment_pk}/
    def comment_replies(self, request, comment_pk=None):
        """
        Paginated replies for a specific comment.
        - Includes username, avatar, profile ID, and role for each replier
        """

        reply_content_type = ContentType.objects.get_for_model(Reply)
        replies = Reply.objects.filter(comment__id=comment_pk).order_by('created_at')

        page = self.paginate_queryset(replies)
        if page is not None:
            response_data = [
                {
                    'reply': self.get_serializer(reply).data,
                    'user': {
                        'username': reply.userprofile.user.username,
                        'avatar': reply.userprofile.avatar_image.url if reply.userprofile.avatar_image else None,
                        'profile_id': reply.userprofile.id,
                        'role': reply.userprofile.role,
                    },
                    'likes_count': Like.objects.filter(content_type=reply_content_type, object_id=reply.id).count(),  # Count likes for this reply
                    'is_liked': Like.objects.filter(  content_type=reply_content_type, object_id=reply.id,userprofile=self.request.user.user).exists()

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

    @action(detail=False, methods=['delete'], url_path='unlike')
    def unlike(self, request):
        """
        Allows a user to unlike a post or comment.
        Expects 'object_id' and 'content_type' (e.g., post, comment) in the request data.
        """
        object_id = request.data.get('object_id')
        content_type = request.data.get('content_type')

        if not object_id or not content_type:
            return Response({'error': 'object_id and content_type are required'}, status=400)

        # Get the content type model (Post, Comment, etc.)
        try:
            content_type_obj = ContentType.objects.get(model=content_type)
        except ContentType.DoesNotExist:
            return Response({'error': 'Invalid content type'}, status=400)

        # Check if the like exists
        like = Like.objects.filter(userprofile=request.user.user, content_type=content_type_obj, object_id=object_id).first()
        
        if not like:
            return Response({'error': 'Like not found'}, status=404)

        # Delete the like (unlike)
        like.delete()
        return Response({'message': 'Successfully unliked'}, status=204)

   
class FollowViewSet(viewsets.ModelViewSet):
    # Basic CRUD for Follow model
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    

    @action(detail=False, methods=['delete']) # URL =  # DELETE followers/unfollow/ 
    def unfollow(self, request):
        """
        Allows a user to unfollow another user.
        Expects 'followed_user_id' in the request data.
        """
        followed_user_id = request.data.get('followed')

        if not followed_user_id:
            return Response({'error': 'followed_user_id is required'}, status=400)

        follow = Follow.objects.filter(
            follower=request.user.user, 
            followed_id=followed_user_id
        ).first()

        if not follow:
            return Response({'error': 'Follow relationship not found'}, status=404)

        follow.delete()
        return Response({'message': 'Successfully unfollowed'}, status=204)
    
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
                    'enrollment_year':follower.studentprofile.enrollment_year,
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
            else:
                   response_data.append({
                    'id': follower.id,
                    'full_name': follower.full_name,
                    'avatar_image': follower.avatar_image.url if follower.avatar_image else None,
                    'role': follower.role,
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

    @action(detail=False, methods=['post'], url_path='create-with-options') # POST /polls/create-with-options/
    @transaction.atomic # The @transaction.atomic decorator ensures that the poll and its options are either saved together or rolled back if any error occurs.
    def create_with_options(self, request):
        """
        Create a poll and its options in a single request.
        Expected payload:
        {
            "post": 1,
            "question": "Your poll question?",
            "poll_type": "single",
            "options": [
                {"option_text": "Option 1"},
                {"option_text": "Option 2"},
                {"option_text": "Option 3"}
            ]
        }
        """
        data = request.data

        # Validate and save the poll
        poll_serializer = PollSerializer(data={
            "post": data.get("post"),
            "question": data.get("question"),
            "poll_type": data.get("poll_type"),
        })
        if not poll_serializer.is_valid():
            return Response(poll_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        poll = poll_serializer.save()

        # Validate and save the options
        options = data.get("options", [])
        if not options:
            return Response({"detail": "At least one option is required."}, status=status.HTTP_400_BAD_REQUEST)

        for option_data in options:
            option_data['poll'] = poll.id  # Associate the option with the created poll
        option_serializer = PollOptionSerializer(data=options, many=True)
        if not option_serializer.is_valid():
            return Response(option_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        option_serializer.save()

        return Response({
            "poll": poll_serializer.data,
            "options": option_serializer.data,
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'], url_path='withoptions')
    def all_polls_with_options(self, request):
        """
        Get all polls with their associated options.
        """
        polls = Poll.objects.prefetch_related('options').all()
        data = [
            {
                'poll_id': poll.id,
                'question': poll.question,
                'poll_type': poll.poll_type,
                'created_at': poll.created_at,
                'post_id': poll.post.id,
                'options': [
                    {
                        'id': option.id,
                        'text': option.option_text,
                        'votes_count': option.votes.count(),
                    }
                    for option in poll.options.all()
                ]
            }
            for poll in polls
        ]
        return Response(data)
    @action(detail=False, methods=['get'], url_path='post/(?P<post_pk>\d+)')
    def polls_for_post(self, request, post_pk=None):
        """
        Get all polls for a specific post, including their options.
        """
        if not post_pk:
            return Response({'detail': 'Post ID is required.'}, status=400)

        polls = Poll.objects.prefetch_related('options').filter(post__id=post_pk)
        if not polls.exists():
            return Response({'detail': 'No polls found for this post.'}, status=404)
        
        for poll in polls:
            for option in poll.options.all():
                print(f"Option: {option.option_text}, Votes: {option.votes.count()}")
    

        data = [
            {
                'poll_id': poll.id,
                'question': poll.question,
                'poll_type': poll.poll_type,
                'created_at': poll.created_at,
                'options': [
                    {
                        'id': option.id,
                        'text': option.option_text,
                        'votes_count': PollVote.objects.filter(poll=poll, option=option).count(),
                    }
                    for option in poll.options.all()
                ]
            }
            for poll in polls
        ]
        return Response(data)
    @action(detail=True, methods=['get'], url_path='options')  # GET /polls/{poll_id}/options/
    def poll_options(self, request, pk=None):
        """
        Get all options for a specific poll.
        """
        try:
            poll = self.get_object()
            options = poll.options.all()
            serializer = PollOptionSerializer(options, many=True)
            return Response(serializer.data)
        except Poll.DoesNotExist:
            return Response({'detail': 'Poll not found.'}, status=status.HTTP_404_NOT_FOUND)

class PollOptionViewSet(viewsets.ModelViewSet):
    # Basic CRUD for PollOption model
    queryset = PollOption.objects.all()
    serializer_class = PollOptionSerializer
    

class PollVoteViewSet(viewsets.ModelViewSet):
    # Basic CRUD for PollVote model
    queryset = PollVote.objects.all()
    serializer_class = PollVoteSerializer

    def create(self, request, *args, **kwargs):
        """
        Custom create logic for poll votes.
        """
        user = request.user.user  # Assuming user is linked to UserProfile
        data = request.data

        try:
            poll = Poll.objects.get(id=data.get('poll'))
            option = PollOption.objects.get(id=data.get('option'))
        except (Poll.DoesNotExist, PollOption.DoesNotExist):
            return Response({'detail': 'Poll or option not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Single-vote poll logic
        if poll.poll_type == 'single':
            existing_vote = PollVote.objects.filter(userprofile=user, poll=poll)
            if existing_vote.exists():
                existing_vote.update(option=option)  # Update the existing vote
                return Response({'detail': 'Vote updated successfully.'}, status=status.HTTP_200_OK)

        # Multiple-choice poll logic
        elif poll.poll_type == 'multiple':
            existing_vote = PollVote.objects.filter(userprofile=user, poll=poll, option=option)
            if existing_vote.exists():
                return Response({'detail': 'You have already voted for this option.'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the new vote
        vote = PollVote(userprofile=user, poll=poll, option=option)
        try:
            vote.save()
        except ValidationError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Vote recorded successfully.'}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'], url_path='poll-votes')  # GET /polls/{poll_id}/votes/
    def poll_votes(self, request, pk=None):
        """
        Get all votes for a specific poll.
        """
        try:
            poll = Poll.objects.get(id=pk)
            votes = PollVote.objects.filter(poll=poll)
            serializer = PollVoteSerializer(votes, many=True)
            return Response(serializer.data)
        except Poll.DoesNotExist:
            return Response({'detail': 'Poll not found.'}, status=status.HTTP_404_NOT_FOUND)
    
# content_types = ContentType.objects.filter(model__in=['post', 'comment', 'reply'])

#         # Print the content type ids and associated models
#         for content_type in content_types:
#             print(f"Model: {content_type.model}, ContentType ID: {content_type.id}")

