from django.db.models.signals import post_save
from django.dispatch import receiver
from social.models import UserProfile, Post
from ai.embedding_utils import generate_user_embedding, generate_post_embedding
from ai.vectordb import store_user_embedding, store_post_embedding

@receiver(post_save, sender=UserProfile)
def update_user_embedding(sender, instance, **kwargs):
    """
    Signal triggered after saving a UserProfile instance.
    - Generates and stores the user's embedding in the vector database.
    """
    if instance.resume or instance.preferences or instance.bio:  # Ensure we have data for embedding
        print(f"Updating embedding for UserProfile {instance.id}")
        store_user_embedding(instance)  # Generate and store the embedding
    else:
        print(f"Skipping embedding update for UserProfile {instance.id}: insufficient data.")

@receiver(post_save, sender=Post)
def update_post_embedding(sender, instance, **kwargs):
    """
    Signal triggered after saving a Post instance.
    - Generates and stores the post's embedding in the vector database.
    """
    if instance.content:  # Ensure there is content to embed
        print(f"Updating embedding for Post {instance.id}")
        store_post_embedding(instance)  # Generate and store the embedding
    else:
        print(f"Skipping embedding update for Post {instance.id}: no content available.")