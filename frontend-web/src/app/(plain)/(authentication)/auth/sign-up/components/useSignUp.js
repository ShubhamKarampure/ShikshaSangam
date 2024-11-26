import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import { signup } from '@/api/auth';
import useSignUpPageContext from '@/context/useSignUpPageContext';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();
  const {increaseStep} = useSignUpPageContext();

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
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });
const register = handleSubmit(async (data) => {
  setLoading(true); // Set loading to true when the form is submitted
  
  try {
    const res = await signup(data); // Pass the form data to signup API
    
    showNotification({
      message: 'User created successfully. Redirecting....',
      variant: 'success'
    });
    increaseStep();
    
  } catch (e) {
    console.error('Signup error:', e); // Log the error to the console for debugging

    // Check if e.response exists before trying to access it
    if (e && e.response && e.response.data && (e.response.data.email || e.response.data.username)) {

      // Customize the error message based on the response
      if (e.response.data.email && e.response.data.username) {
        showNotification({
          message: 'An account with these credentials already exists. Please sign in.',
          variant: 'danger',
        });
      } else if (e.response.data.username) {
        showNotification({
          message: 'Username already exists. Please choose a different one.',
          variant: 'danger',
        });
      } else if (e.response.data.email) {
        showNotification({
          message: 'Email already exists. Please use a different one.',
          variant: 'danger',
        });
      } else {
        showNotification({
          message: errorMessage,
          variant: 'danger',
        });
      }
    } else {
      // Handle other error types (e.g., network errors)
      showNotification({
        message: 'An unexpected error occurred. Please try again later.',
        variant: 'danger',
      });
    }
  } finally {
    setLoading(false); // Ensure loading is set to false after completion
  }
});


  return {
    loading,
    register,
    control,
    watch,
    getValues,
  };
};

export default useSignUp;