import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '@/context/useAuthContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import { signin } from '@/api/auth';
import axios from 'axios';


const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveSession } = useAuthContext();
  const [searchParams] = useSearchParams();
  const { showNotification } = useNotificationContext();

  // Validation schema
  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password')
  });

  // React Hook Form setup
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: 'user@demo.com',
      password: '12345678'
    }
  });

  // Redirect logic
  const redirectUser = () => {
    const redirectLink = searchParams.get('redirectTo');
    if (redirectLink) {
      navigate(redirectLink);
    } else {
      navigate('/');
    }
  };

  // Handle the login process
  const login = handleSubmit(async (data) => {
    setLoading(true);  // Set loading state to true while processing the login

    try {
      const response = await signin(data);  // Pass the form data to signin
      const { access, refresh, user } = response;

      saveSession({ access, refresh, user });
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

      showNotification({
        message: 'Successfully logged in. Redirecting....',
        variant: 'success'
      });

      // Redirect the user after a successful login
      redirectUser();
    } catch (e) {
      // Handle any login errors
      console.log(e)
      const message = e.response?.data?.detail || 'Login failed. Please try again.';
      showNotification({ message, variant: 'danger' });
    } finally {
      setLoading(false);  // Reset loading state
    }
  });

  return {
    loading,
    login,
    control
  };
};

export default useSignIn;
