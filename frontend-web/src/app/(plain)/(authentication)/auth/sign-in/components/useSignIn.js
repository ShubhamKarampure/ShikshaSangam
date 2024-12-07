import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { useAuthContext } from '@/context/useAuthContext';
import { useNotificationContext } from '@/context/useNotificationContext';
import { signin } from '@/api/auth';
import axios from 'axios';
import { getCookie, setCookie } from "cookies-next";

const useSignIn = (emailOptions) => {
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
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: emailOptions[0] || '',  // Set the default email to the first option
      password: 'password'
    }
  });

  // Redirect logic
  const redirectUser = (loggedInUser) => {
    const redirectLink = searchParams.get('redirectTo');
    if(loggedInUser.profile_id===null){
      setCookie("_PROFILE_SETUP_", false);
      navigate('/profile-setup');
      return;
    }
    if (redirectLink) {
      navigate(redirectLink);
      return;
    } else if(loggedInUser.role==="college_admin"){
      navigate('/admin/dashboard');
      return;
    }else{
      navigate('/')
      return;
    }
  };

  // Handle the login process
  const login = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await signin(data);
      const { access, refresh, user: loggedInUser } = response;
      await saveSession({ access, refresh, user: loggedInUser });
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

      showNotification({
        message: 'Successfully logged in. Redirecting....',
        variant: 'success'
      });

      redirectUser(loggedInUser);
    } catch (e) {
      console.log(e);
      
      const message = e.response?.data?.detail || 'Login failed. Please try again.';
      showNotification({ message, variant: 'danger' });
    } finally {
      setLoading(false);
    }
  });

  return {
    loading,
    login,
    control,
    setValue
  };
};

export default useSignIn;
