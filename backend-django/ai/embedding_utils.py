from sentence_transformers import SentenceTransformer
import PyPDF2
import requests
import os

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")  # Change as needed

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
    base_url = f"https://res.cloudinary.com/{cloud_name}/"
    return f"{base_url}{key}.pdf"


def extract_text_from_post(post):
    """
    Extract meaningful content from a post.
    """
    return post.content or ""

def generate_post_embedding(post):
    """
    Generate an embedding for a post.
    """
    content = extract_text_from_post(post)
    return embedding_model.encode(content)

def generate_user_embedding(user_profile):
    """
    Generate a combined embedding for a user's profile.
    """
    # Extract fields
    resume_url = get_cloudinary_url(user_profile.resume) if user_profile.resume else None
    preferences = user_profile.preferences or {}
    role = user_profile.role or "no role"
    bio = user_profile.bio or ""
    college_name = user_profile.college.college_name if user_profile.college else "No College"

    # Convert preferences to string
    preferences_text = preferences_to_string(preferences)

    # Extract resume text
    resume_text = extract_resume_text_from_url(resume_url) if resume_url else ""

    # Combine into a single text representation
    combined_text = (
        f"Role: {role}. Bio: {bio}. College: {college_name}. "
        f"Preferences: {preferences_text}. Resume: {resume_text}"
    )

    # Generate embedding
    return embedding_model.encode(combined_text)

def preferences_to_string(preferences):
    """
    Convert JSON preferences into a meaningful string.
    """
    domains = ", ".join(preferences.get("domains", [])) or ""
    roles = ", ".join(preferences.get("roles", [])) or ''
    interests = ", ".join(preferences.get("interests", [])) or ''
    skills = ", ".join(preferences.get("skills", [])) or ' '
    return f"Domains: {domains}. Roles: {roles}. Interests: {interests}."

def extract_resume_text_from_url(resume_url):
    """
    Extract text from a PDF stored at the given URL.
    """
    print(f"resume url = {resume_url}")
    response = requests.get(resume_url)
    with open("temp_resume.pdf", "wb") as f:
        f.write(response.content)

    with open("temp_resume.pdf", "rb") as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        text = " ".join([page.extract_text() for page in reader.pages])
    return text
