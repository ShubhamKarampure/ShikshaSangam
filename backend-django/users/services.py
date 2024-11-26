from django.conf import settings
from django.shortcuts import redirect
from django.core.exceptions import ValidationError
from urllib.parse import urlencode
from typing import Dict, Any
import requests
import jwt
from django.contrib.auth.models import User

GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'
LOGIN_URL = 'http://localhost:5173/'

# Exchange authorization token with access token
import requests
from django.core.exceptions import ValidationError

def google_get_access_token(code: str, redirect_uri: str) -> str:
    data = {
        'code': code,
        'client_id': settings.GOOGLE_OAUTH2_CLIENT_ID,
        'client_secret': settings.GOOGLE_OAUTH2_CLIENT_SECRET,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }

    # The correct URL for exchanging the authorization code for an access token
    GOOGLE_ACCESS_TOKEN_OBTAIN_URL = 'https://oauth2.googleapis.com/token'
    
    response = requests.post(GOOGLE_ACCESS_TOKEN_OBTAIN_URL, data=data)
    print(response.status_code, response.text)  # For debugging purposes

    if not response.ok:
        raise ValidationError(f'Could not get access token from Google. Error: {response.text}')
    
    try:
        access_token = response.json()['access_token']
    except KeyError:
        raise ValidationError('Access token not found in response.')

    return access_token


# Get user info from google
def google_get_user_info(access_token: str) -> Dict[str, Any]:
    response = requests.get(
        GOOGLE_USER_INFO_URL,
        params={'access_token': access_token}
    )

    if not response.ok:
        raise ValidationError('Could not get user info from Google.')
    
    return response.json()


def get_user_data(validated_data):
  
    redirect_uri = 'http://127.0.0.1:8000/users/api/v1/auth/google/callback/'

    code = validated_data.get('code')
    error = validated_data.get('error')

    if error or not code:
        params = urlencode({'error': error})
        return redirect(f'{LOGIN_URL}?{params}')
    
    access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)
    user_data = google_get_user_info(access_token=access_token)

    # Creates user in DB if first time login
    User.objects.get_or_create(
        username = user_data['email'],
        email = user_data['email'],
        first_name = user_data.get('given_name'), 
        last_name = user_data.get('family_name')
    )
    
    profile_data = {
        'email': user_data['email'],
        'first_name': user_data.get('given_name'),
        'last_name': user_data.get('family_name'),
    }
    return profile_data