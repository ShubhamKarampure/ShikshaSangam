import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import { signup } from '@/api/auth';
import axios from 'axios';
import { useAuthContext } from '@/context/useAuthContext';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();
  const { saveSession } = useAuthContext();
  
  const signUpSchema = yup.object({
    username: yup.string().required('Please enter your username'),
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter your password'),
    password1: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const register = handleSubmit(async (data) => {
    setLoading(true);

    try {
      const formData = {
        username: data.username, // Extract username
        email: data.email,       // Extract email
        password: data.password, // Extract password (not password1)
      };
      
      const res = await signup(formData); // Call your signup API
      
      const { access, refresh, user } = res;
      saveSession({ access, refresh, user });
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

      showNotification({
        message: 'User created successfully. Redirecting....',
        variant: 'success',
      });
    
      navigate('/'); // Redirect on success
    } catch (e) {
      console.error('Signup error:', e);
      showNotification({
        message: 'Error occurred during signup.',
        variant: 'danger',
      });
    } finally {
      setLoading(false);
    }
  });

  return {
    loading,
    register,
    control,
    watch,
    getValues,
    setValue, // Expose setValue to update form fields when Google sign-in is used
  };
};

export default useSignUp;
