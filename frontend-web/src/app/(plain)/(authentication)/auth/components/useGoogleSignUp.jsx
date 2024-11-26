import { GoogleLogin } from '@react-oauth/google';
import { useNotificationContext } from '@/context/useNotificationContext';
import { useAuthContext } from '@/context/useAuthContext';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { saveSession } = useAuthContext();
  const { showNotification } = useNotificationContext();
  const navigate = useNavigate();
const [searchParams] = useSearchParams();
  const handleLoginSuccess = async (response) => {
    const googleToken = response.credential;
    setLoading(true);

    // Redirect logic
    const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) {
      navigate(redirectLink);
    } else {
      navigate('/');
    }
    };
    
    try {
      const res = await fetch('http://127.0.0.1:8000/users/google-auth/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken }),
      });

      
      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        throw new Error(data?.message || 'Invalid server response');
      }

      // Save the session/token and notify the user
      const { access, refresh, user } = response;

      saveSession({ access, refresh, user });

      showNotification({
        message: 'Google login successful!',
        variant: 'success',
      });

      // Redirect the user after a successful login
      redirectUser();
    
    } catch (error) {
      console.error('Google login error:', error);
      showNotification({
        message: 'Google login failed. Please try again.',
        variant: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed:', error);
    showNotification({
      message: 'Google login failed. Please try again.',
      variant: 'danger',
    });
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        cookiePolicy="single_host_origin"
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default GoogleSignIn;
