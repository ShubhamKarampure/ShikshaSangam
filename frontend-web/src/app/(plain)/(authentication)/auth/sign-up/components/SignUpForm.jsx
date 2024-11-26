import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import useSignUp from './useSignUp';
import GoogleLoginButton from '../../components/useGoogleSignUp';

const SignUpForm = () => {
  const [firstPassword, setFirstPassword] = useState('');
  const { loading, register, control, watch, getValues } = useSignUp();

  useEffect(() => {
    setFirstPassword(getValues().password1);
  }, [watch('password1')]);

  return (
    <form className="mt-4" onSubmit={register}>
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

      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          Sign Up
        </Button>
      </div>

      <div className="or-separator text-center my-4 d-flex align-items-center">
        <hr className="line flex-grow-1" style={{ borderColor: 'white', borderWidth: '1px' }} />
        <span className="or-text mx-3" style={{ color: 'white', fontWeight: 'bold' }}>Or</span>
        <hr className="line flex-grow-1" style={{ borderColor: 'white', borderWidth: '1px' }} />
      </div>

      {/* Google Login */}
      <GoogleLoginButton />

      <p className="mb-0 mt-3 text-center">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved.
      </p>
    </form>
  );
};

export default SignUpForm;
