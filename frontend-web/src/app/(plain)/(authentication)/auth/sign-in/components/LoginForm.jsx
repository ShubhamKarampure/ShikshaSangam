import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link } from 'react-router-dom';
import useSignIn from './useSignIn';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { Button, FormCheck, Form } from 'react-bootstrap';
import GoogleLoginButton from '../../components/useGoogleSignUp';

const LoginForm = () => {
  const emailOptions = ['admin@demo.com', 'student@demo.com', 'alumni@demo.com', ];  // Replace with your email options
  const { loading: loginLoading, login, control, setValue } = useSignIn(emailOptions);

  const handleEmailChange = (event) => {
    setValue('email', event.target.value); // Update the form value when a new email is selected
  };

  return (
    <form className="mt-sm-4" onSubmit={login}>
      <Form.Group className="mb-3">
        <Form.Label>Select your email</Form.Label>
        <Form.Control as="select" onChange={handleEmailChange} defaultValue={emailOptions[0]}>
          {emailOptions.map((email, index) => (
            <option key={index} value={email}>
              {email}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      
      <div className="mb-3 position-relative">
        <PasswordFormInput
          name="password"
          placeholder="Enter password"
          control={control}
          size="lg"
          containerClassName="w-100"
        />
      </div>
      
      <div className="mb-3 d-sm-flex justify-content-between">
        <div>
          <FormCheck type="checkbox" label="Remember me?" id="rememberCheck" />
        </div>
        <Link to="/auth/forgot-pass">Forgot password?</Link>
      </div>
      
      <div className="d-grid mb-3">
        <Button variant="primary" size="lg" type="submit" disabled={loginLoading}>
          Login
        </Button>
      </div>

      <div className="or-separator text-center my-4 d-flex align-items-center">
        <hr className="line flex-grow-1" style={{ borderColor: 'white', borderWidth: '1px' }} />
        <span className="or-text mx-3" style={{ color: 'white', fontWeight: 'bold' }}>Or</span>
        <hr className="line flex-grow-1" style={{ borderColor: 'white', borderWidth: '1px' }} />
      </div>
    
      <GoogleLoginButton />

      <p className="mb-0 mt-3">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
      </p>
    </form>
  );
};

export default LoginForm;
