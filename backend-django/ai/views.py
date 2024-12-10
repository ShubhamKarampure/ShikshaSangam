from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ai.models import UserEmbedding
from ai.vectordb import recommend_users, recommend_posts, store_post_embedding, store_user_embedding, get_user_embedding
from ai.embedding_utils import generate_user_embedding, generate_post_embedding
from social.views import PostViewSet, PostOffsetPagination
from social.models import Follow
from django.db.models import Q


class RecommendationView(APIView):
    """
    Provide personalized recommendations for the current user.
    """
    def get(self, request):
        # Fetch or dynamically generate the user's embedding
        print(f"current_user = {request.user.user}")
        try:
            user_embedding = UserEmbedding.objects.get(user=request.user.user)
            query_embedding = get_user_embedding(request.user.user)
            

        except UserEmbedding.DoesNotExist:
            # Dynamically generate embedding if not stored in the database
            # query_embedding = generate_user_embedding(request.user.user)

            store_user_embedding(request.user.user)
            query_embedding = get_user_embedding(request.user.user)
        


        # print(f"query_embedding = {query_embedding}")
        # Get user and post recommendations
        recommended_users = recommend_users(query_embedding, top_k=None)
        
        followed_userprofiles = Follow.objects.filter(
            follower=request.user.user
        ).values_list('followed', flat=True)
       
        
      #  print(p.id for p in followed_userprofiles)
        for p in followed_userprofiles:
            print(p.id)

        userstofollow = recommended_users.exclude(
            id__in=followed_userprofiles
        ).exclude(
            id=request.user.user.id
        ).filter(
            Q(role='student') | Q(role='alumni')  # Only students and alumni
        )
        
        print(p for p in userstofollow)

         
        # print(f"recommmended_users = {recommended_users}")
    
        # recommended_posts = recommend_posts(query_embedding, top_k=5)

        # Format recommendations dynamically
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
             else:
                 pass
            

       

        return Response(response_data)

class PRecommendationView(APIView):
    """
    Provide personalized recommendations for the current user.
    """
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

    def get(self, request):
        # Fetch or dynamically generate the user's embedding
        print(f"current_user = {request.user.user}")
        try:
            user_embedding = UserEmbedding.objects.get(user=request.user.user)
            query_embedding = get_user_embedding(request.user.user)
            

        except UserEmbedding.DoesNotExist:
            # Dynamically generate embedding if not stored in the database
            # query_embedding = generate_user_embedding(request.user.user)

            store_user_embedding(request.user.user)
            query_embedding = get_user_embedding(request.user.user)
 

        # print(f"query_embedding = {query_embedding}")
        # Get user and post recommendations
        #recommended_users = recommend_users(query_embedding, top_k=5)
        
        # print(f"recommmended_users = {recommended_users}")
    
        recommended_posts = recommend_posts(query_embedding, top_k=5)
        print(f"recommmended_posts= {recommended_posts}")
        
        # Format recommendations dynamically
        response_data = []
        
        
            

       

        return Response(response_data)
    