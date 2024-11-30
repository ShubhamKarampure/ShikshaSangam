import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link } from 'react-router-dom';
import useSignIn from './useSignIn';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { Button, FormCheck, Form } from 'react-bootstrap';
import GoogleLoginButton from '../../components/useGoogleSignUp';

const LoginForm = () => {
  const emailOptions = ['admin@demo.com', 'student@demo.com', 'alumni@demo.com'];  // Predefined email options
  const { loading: loginLoading, login, control, setValue } = useSignIn(emailOptions);

  const handleEmailChange = (event) => {
    setValue('email', event.target.value); // Update the form value when a new email is selected or typed
  };

  return (
    <form className="mt-sm-4" onSubmit={login}>
      {/* Email Input Field */}
      <Form.Group className="mb-3">
        <TextFormInput
          name="email"
          placeholder="Enter your email"
          control={control}
          size="lg"
          list="email-options"
          onChange={handleEmailChange} // Allow typing custom email or selecting from dropdown
        />
        <datalist id="email-options">
          {emailOptions.map((email, index) => (
            <option key={index} value={email} />
          ))}
        </datalist>
      </Form.Group>

      {/* Password Input */}
      <div className="mb-3 position-relative">
        <PasswordFormInput
          name="password"
          placeholder="Enter password"
          control={control}
          size="lg"
          containerClassName="w-100"
        />
      </div>

      {/* Remember Me Checkbox */}
      <div className="mb-3 d-sm-flex justify-content-between">
        <div>
          <FormCheck type="checkbox" label="Remember me?" id="rememberCheck" />
        </div>
        <Link to="/auth/forgot-pass">Forgot password?</Link>
      </div>

      {/* Login Button */}
      <div className="d-grid mb-3">
        <Button variant="primary" size="lg" type="submit" disabled={loginLoading}>
          Login
        </Button>
      </div>

      {/* Google Login Option */}
      <div className="or-separator text-center my-4 d-flex align-items-center">
        <hr className="line flex-grow-1" style={{ borderColor: 'white', borderWidth: '1px' }} />
        <span className="or-text mx-3" style={{ color: 'white', fontWeight: 'bold' }}>Or</span>
        <hr className="line flex-grow-1" style={{ borderColor: 'white', borderWidth: '1px' }} />
      </div>
    
      <GoogleLoginButton />

      {/* Footer */}
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
