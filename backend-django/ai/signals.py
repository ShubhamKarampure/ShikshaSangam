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
    print(f'signal triggered for profile {instance.id}')
    if created:  
        print('created')# Trigger embedding generation for new profiles
        print(f"Creating embedding for new UserProfile {instance.id}")
        store_user_embedding(instance)
        return
    
      # Detect updated fields by comparing current and previous values
    relevant_fields = {"resume", "experience", 'skills', 'project', "bio"}
    changed_fields = set()

    # Use `instance.__class__.objects` to fetch the current state from the database
    original_instance = instance.__class__.objects.get(pk=instance.pk)

    for field in relevant_fields:
        current_value = getattr(instance, field)
        original_value = getattr(original_instance, field)
        if current_value != original_value:
            changed_fields.add(field)

    # Check if any relevant fields were updated
    if changed_fields:
        print(f"Updating embedding for UserProfile {instance.id}: fields changed = {changed_fields}")
        store_user_embedding(instance)
    else:
        print(f"Skipping embedding update for UserProfile {instance.id}: no relevant fields updated.")

   # Handle updates for specific fields
    updated_fields = kwargs.get('update_fields')
    print(f'updated_fields = {updated_fields}')
    relevant_fields = {"resume", "skills",'project','experience' "bio"}

    if updated_fields:
        print('updated')
        if relevant_fields.intersection(updated_fields):  # Check if relevant fields were updated
            print(f"Updating embedding for UserProfile {instance.id}: relevant fields changed.")
            store_user_embedding(instance)
        else:
            print(f"Skipping embedding update for UserProfile {instance.id}: irrelevant fields updated.")
    else: 
        
        pass
        # If `update_fields` is not available, assume a full save and check fields manually
        # if instance.resume or instance.preferences or instance.bio:
        #     # print(f"Updating embedding for UserProfile {instance.id}: full save detected.")
        #     # store_user_embedding(instance)
        #     print(f"Skipping embedding update for UserProfile {instance.id}.")

        #     pass
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