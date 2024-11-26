import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, FormCheck } from 'react-bootstrap';
import useSignUp from './useSignUp.js';
import { GoogleLogin } from '@react-oauth/google'; 

const GoogleLoginButton = () => {
  
  const handleLoginSuccess = (response) => {
    const googleToken = response.credential;

    // Send the Google JWT token to your Django backend
    fetch('http://127.0.0.1:8000/users/google-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: googleToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response and store the JWT token in localStorage/sessionStorage or Redux state
        console.log('JWT token received:', data.token);
        localStorage.setItem('token', data.token);  // Store the token for further use
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleLoginFailure = (error) => {
    console.error('Google Login Error:', error);
  };

  return (
    <div>
      <GoogleLogin
        clientId="your-client-id.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

;

const SignUpForm = () => {
  const [firstPassword, setFirstPassword] = useState('');
  const {
    loading,
    register,
    control,
    watch,
    getValues,
  } = useSignUp();

  useEffect(() => {
    setFirstPassword(getValues().password1);
  }, [watch('password1')]);

  return (
    <form className="mt-4" onSubmit={register}>
      
      {/* Username and Email Fields */}
      <div className="mb-3">
        <TextFormInput
          name="username"
          control={control}
          containerClassName="input-group-lg"
          placeholder="Enter your username"
        />
      </div>

      <div className="mb-3">
        <TextFormInput
          name="email"
          control={control}
          containerClassName="input-group-lg"
          placeholder="Enter your email"
        />
      </div>

      {/* Password Fields */}
      <div className="mb-3">
        <PasswordFormInput
          name="password1"
          control={control}
          size="lg"
          placeholder="Enter new password"
        />
        <div className="mt-2">
          <PasswordStrengthMeter password={firstPassword} />
        </div>
      </div>

      <div className="mb-3">
        <PasswordFormInput
          name="password2"
          control={control}
          size="lg"
          placeholder="Confirm password"
        />
      </div>

      {/* Submit Button */}
      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          SignUp
        </Button>
      </div>

      {/* Separator for or */}
      <div className="or-separator text-center my-4 d-flex align-items-center">
  <hr className="line flex-grow-1" style={{ borderColor: 'white', borderWidth: '1px' }} />
  <span className="or-text mx-3" style={{ color: 'white', fontWeight: 'bold' }}>Or</span>
  <hr className="line flex-grow-1" style={{ borderColor: 'white', borderWidth: '1px' }} />
</div>


      <GoogleLoginButton/>

      <p className="mb-0 mt-3 text-center">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
      </p>
    </form>
  );
};

export default SignUpForm;
