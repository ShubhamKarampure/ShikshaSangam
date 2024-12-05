from django.shortcuts import render
import os

def get_cloudinary_url(key: str) -> str:
    """
    Wraps a given Cloudinary key into the proper Cloudinary URL format.

    Args:
        key (str): The Cloudinary key (public ID) of the resource.

    Returns:
        str: The full Cloudinary URL.
    """
    # Fetch the Cloudinary cloud name from environment variables
    cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME')
    
    if not cloud_name:
        raise EnvironmentError("CLOUDINARY_CLOUD_NAME is not set in environment variables.")

    # Construct the full Cloudinary URL
    base_url = f"https://res.cloudinary.com/{cloud_name}"
    return f"{base_url}{key}"

