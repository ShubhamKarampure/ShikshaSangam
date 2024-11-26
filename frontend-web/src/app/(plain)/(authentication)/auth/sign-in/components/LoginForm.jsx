import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link } from 'react-router-dom';
import useSignIn from './useSignIn';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { Button, FormCheck } from 'react-bootstrap';
import React  from 'react';
import GoogleButton from "react-google-button";

const onGoogleLoginSuccess = () => {
  const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const GOOGLE_OAUTH2_CLIENT_ID = '206440698991-poes8injrmsgvni9v479tqc4shj5gnkv.apps.googleusercontent.com'
  const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ].join(' ');

  const params = {
    response_type: 'code',
    client_id: GOOGLE_OAUTH2_CLIENT_ID,
    redirect_uri: `http://127.0.0.1:8000/users/api/v1/auth/google/callback/`,
    prompt: 'select_account',
    access_type: 'offline',
    scope
  };

  const urlParams = new URLSearchParams(params).toString();
  window.location = `${GOOGLE_AUTH_URL}?${urlParams}`;
};

const LoginButton = () => {
  return <GoogleButton onClick={onGoogleLoginSuccess} label="Sign in with Google"/>
}


const LoginForm = () => {
    
  const {
    loading,
    login,
    control
  } = useSignIn();
  return <form className="mt-sm-4" onSubmit={login}>
      <TextFormInput name="email" type="email" placeholder="Enter email" control={control} containerClassName="mb-3 input-group-lg" />
      <div className="mb-3 position-relative">
        <PasswordFormInput name="password" placeholder="Enter password" control={control} size="lg" containerClassName="w-100" />
      </div>
      <div className="mb-3 d-sm-flex justify-content-between">
        <div>
          <FormCheck type="checkbox" label="Remember me?" id="rememberCheck" />
        </div>
        <Link to="/auth/forgot-pass">Forgot password?</Link>
      </div>
      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          Login
        </Button>
      </div>
      <p className="mb-0 mt-3">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
    </p>
    <LoginButton/>
    </form>;
};
export default LoginForm;