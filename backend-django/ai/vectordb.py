from .db_manager import FAISSManager
from .embedding_utils import generate_post_embedding, generate_user_embedding
from .models import UserEmbedding, PostEmbedding
from social.models import UserProfile, Post
import faiss
import json
import numpy as np
from django.db.models import Case, When


# Initialize FAISS
DIMENSION = 384  # Change this based on your embedding model
faiss_manager = FAISSManager(dimension=DIMENSION)
post_faiss = FAISSManager(dimension=DIMENSION, db_path='post_db.faiss')

def store_user_embedding(user_profile):
    """
    Generate and store a user's embedding in the vector DB and UserEmbedding model.
    """
    embedding = generate_user_embedding(user_profile)
    vector_id = f"user_{user_profile.id}"  # Unique identifier
    metadata = {"type": "user", "id": user_profile.id}
    
    if vector_id in faiss_manager.metadata:
        # Remove existing vector from FAISS
        print('duplicate vector detected')
        #faiss_manager.remove(vector_id)
    
    try:
        user_embedding = UserEmbedding.objects.get(vector_id=vector_id)
        # Update the existing object
        faiss_manager.add(embedding, id=vector_id, metadata=metadata)
        user_embedding.embedding = embedding.tolist()
        user_embedding.metadata = metadata
        user_embedding.save()
        print(f"Updated UserEmbedding for {vector_id}")
    except UserEmbedding.DoesNotExist:
        # Create a new object
        UserEmbedding.objects.create(
            vector_id=vector_id,
            vector=embedding.tolist(),
            metadata=metadata,
            user = user_profile 
        )
        faiss_manager.add(embedding, id=vector_id, metadata=metadata)
        print(f"Created new UserEmbedding for {vector_id}")
     

def get_user_embedding(user_profile):
    user_embedding = UserEmbedding.objects.get(user=user_profile)
    embedding = np.array(user_embedding.vector)  # Convert list back to NumPy array
    return embedding


def store_post_embedding(post):
    """
    Generate and store a post's embedding in the vector DB and PostEmbedding model.
    """
    embedding = generate_post_embedding(post)
    vector_id = f"post_{post.id}"  # Unique identifier
    metadata = {"type": "post", "id": post.id}
    
    # Add to FAISS
    post_faiss.add(embedding, id=vector_id, metadata=metadata)

    # Save to PostEmbedding model
    PostEmbedding.objects.update_or_create(
        post=post,
        defaults={"vector_id": vector_id, "metadata": metadata},
        vector = embedding.tolist()
    )

def get_post_embedding(post):
    """
    Retrieve a post's embedding from the PostEmbedding model.
    """
    try:
        post_embedding = PostEmbedding.objects.get(post=post)
        embedding = np.array(post_embedding.vector)  # Convert list back to NumPy array
        return embedding
    except PostEmbedding.DoesNotExist:
        raise ValueError(f"No embedding found for post ID {post.id}")

def recommend_users(query_embedding, top_k=None):
    """
    Recommend users based on a query embedding.
    """
    results = faiss_manager.query(query_embedding, top_k=top_k)
    
    user_results = [
            res for res in results if res["metadata"]["type"] == "user"
        ]
    user_ids = [res["metadata"]["id"] for res in user_results]

        # Use `Case` to preserve the order of user_ids in the query
    preserved_order = Case(*[When(id=id, then=pos) for pos, id in enumerate(user_ids)])
    
    # print(f"user results = {user_results}\nuser ids = {user_ids}\n preserved_order = {preserved_order}\n ")
        # Fetch UserProfiles in the correct order
    recommended_users = (
            UserProfile.objects.filter(id__in=user_ids)
            .order_by(preserved_order)
        )

    return recommended_users

def recommend_posts(query_embedding, top_k=5):
    """
    Recommend posts based on a query embedding.
    """
    results = post_faiss.query(query_embedding, top_k=top_k)
    print(results)
    post_ids = [res["metadata"]["id"] for res in results if res["metadata"]["type"] == "post"]
    print(post_ids)
    return Post.objects.filter(id__in=post_ids)

