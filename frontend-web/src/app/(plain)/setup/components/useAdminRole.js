import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotificationContext } from '@/context/useNotificationContext';

const setup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotificationContext();

  const setup = handleSubmit(async (data) => {
    setLoading(true);

    try {
      const res = await setupProfile(data); 
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
     setup, 
  };
};

export default useSignUp;
