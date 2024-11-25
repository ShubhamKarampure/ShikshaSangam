# myapp/validators.py

from django.core.exceptions import ValidationError
import imghdr
from django.core.files.uploadedfile import InMemoryUploadedFile

def validate_image(file):
    """Validator for image files."""
    image_types = ['jpeg', 'png', 'gif', 'bmp']  # Allowed image types
    if isinstance(file, InMemoryUploadedFile):
        # Check the file content type using imghdr to validate image type
        file_type = imghdr.what(file)
        if file_type not in image_types:
            raise ValidationError(f"File must be an image. Allowed formats: {', '.join(image_types)}.")
    else:
        raise ValidationError("File must be an image.")
