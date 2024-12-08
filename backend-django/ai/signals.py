from django.db.models.signals import post_save
from django.dispatch import receiver
from social.models import UserProfile, Post
from ai.embedding_utils import generate_user_embedding, generate_post_embedding
from ai.vectordb import store_user_embedding, store_post_embedding

@receiver(post_save,sender=UserProfile)
def update_user_embedding(sender, instance, created,  **kwargs):
    
    """
    Signal triggered after saving a UserProfile instance.
    Updates embedding only on creation or when specific fields are modified.
    """
    if created:  # Trigger embedding generation for new profiles
        print(f"Creating embedding for new UserProfile {instance.id}")
        store_user_embedding(instance)
        return

    # Handle updates for specific fields
    updated_fields = kwargs.get('update_fields')
    relevant_fields = {"resume", "preferences", "bio"}

    if updated_fields:
        if relevant_fields.intersection(updated_fields):  # Check if relevant fields were updated
            print(f"Updating embedding for UserProfile {instance.id}: relevant fields changed.")
            store_user_embedding(instance)
        else:
            print(f"Skipping embedding update for UserProfile {instance.id}: irrelevant fields updated.")
    else:
        pass
        # If `update_fields` is not available, assume a full save and check fields manually
        # if instance.resume or instance.preferences or instance.bio:
        #     print(f"Updating embedding for UserProfile {instance.id}: full save detected.")
        #     store_user_embedding(instance)
        # else:
        #     print(f"Skipping embedding update for UserProfile {instance.id}: insufficient data.")

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