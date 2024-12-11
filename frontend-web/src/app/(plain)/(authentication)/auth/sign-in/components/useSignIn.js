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
import { useProfileContext } from '@/context/useProfileContext';
import { API_ROUTES } from '@/routes/apiRoute';

const useSignIn = (emailOptions) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { saveSession } = useAuthContext();
  const [searchParams] = useSearchParams();
  const { showNotification } = useNotificationContext();
  const {profile}=useProfileContext()
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
  const redirectUser = async (loggedInUser,res) => {
    const redirectLink = searchParams.get('redirectTo');
    if(loggedInUser.profile_id===null){
      setCookie("_PROFILE_SETUP_", false);
      navigate('/profile-setup');
      return;
    }else if(!profile){
      try {
        const response = await fetch(API_ROUTES.USERPROFILE + user.profile_id, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile data: ${response.status}`);
        }

        const data = await response.json(); // Parse the JSON response
        saveProfileData(data); // Save profile data
        saveProfileStatus(true); // Mark profile as setup
      } catch (error) {
        console.error("Error fetching profile data:", error);
        return null;
      }
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
      const res=await saveSession({ access, refresh, user: loggedInUser });
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

      showNotification({
        message: 'Successfully logged in. Redirecting....',
        variant: 'success'
      });

      redirectUser(loggedInUser,res);
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
