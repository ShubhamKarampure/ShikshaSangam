
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

def validate_pdf(file):
    if file.content_type != "application/pdf":
        raise ValidationError("Uploaded file is not a PDF.")

def validate_csv(file):
    """Validator for CSV files."""
    if isinstance(file, InMemoryUploadedFile):
        if file.content_type != 'text/csv':
            raise ValidationError("File must be a CSV file.")
    else:
        raise ValidationError("File must be a CSV file.")

def validate_excel(file):
    """Validator for Excel files."""
    excel_types = [
        'application/vnd.ms-excel',  # .xls
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  # .xlsx
    ]
    if isinstance(file, InMemoryUploadedFile):
        if file.content_type not in excel_types:
            raise ValidationError("File must be an Excel file (.xls or .xlsx).")
    else:
        raise ValidationError("File must be an Excel file.")

def validate_csv_or_excel(file):
    """Validator for CSV or Excel files."""
    try:
        validate_csv(file)
    except ValidationError:
        validate_excel(file)


def validate_audio(file):
    """Validator for audio files."""
    audio_types = [
        'audio/mpeg',  # MP3
        'audio/wav',   # WAV
        'audio/x-wav', # WAV alternative
        'audio/aac',   # AAC
        'audio/flac',  # FLAC
        'audio/ogg',   # OGG
        'audio/webm',  # WEBM
    ]
    if isinstance(file, InMemoryUploadedFile):
        if file.content_type not in audio_types:
            raise ValidationError(f"File must be an audio file. Allowed formats: {', '.join(audio_types)}.")
    else:
        raise ValidationError("File must be an audio file.")

def validate_audio(file):
    """Validator for audio files."""
    audio_types = [
        'audio/mpeg',  # MP3
        'audio/wav',   # WAV
        'audio/x-wav', # WAV alternative
        'audio/aac',   # AAC
        'audio/flac',  # FLAC
        'audio/ogg',   # OGG
        'audio/webm',  # WEBM
    ]
    if isinstance(file, InMemoryUploadedFile):
        if file.content_type not in audio_types:
            raise ValidationError(f"File must be an audio file. Allowed formats: {', '.join(audio_types)}.")
    else:
        raise ValidationError("File must be an audio file.")

