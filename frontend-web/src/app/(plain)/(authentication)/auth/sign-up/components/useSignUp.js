import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import { signup } from '@/api/auth';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();

  const signUpSchema = yup.object({
    username: yup.string().required('Please enter your username'),
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password1: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Please enter your password'),
    password2: yup
      .string()
      .oneOf([yup.ref('password1')], 'Passwords must match')
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
      const res = await signup(data); // Call your signup API
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
