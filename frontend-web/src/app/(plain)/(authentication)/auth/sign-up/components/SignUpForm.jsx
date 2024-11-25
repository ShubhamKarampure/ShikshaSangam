import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, FormCheck, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import useSignUp from './useSignUp.js';

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
    setFirstPassword(getValues().password);
  }, [watch('password')]);

  const roles = [
    { name: 'College Admin', value: 'college_admin' },
    { name: 'Student', value: 'student' },
    { name: 'Alumni', value: 'alumni' }
  ];

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
        
        <small>We'll never share your email with anyone else.</small>
      </div>

      <div className="mb-3">
        <PasswordFormInput
          name="password"
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

      <div className="mb-3">
        <label className="form-label me-2">Select Role</label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <ButtonGroup>
              {roles.map((r) => (
                <ToggleButton
                  key={r.value}
                  id={`role-${r.value}`}
                  type="radio"
                  variant="outline-primary"
                  value={r.value}
                  checked={field.value === r.value}
                  onChange={(e) => field.onChange(e.currentTarget.value)}
                >
                  {r.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          )}
        />
        
      </div>

      <div className="mb-3 text-start">
        <FormCheck label="Keep me signed in" id="termAndCondition" />
      </div>

      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          Sign me up
        </Button>
      </div>

      <p className="mb-0 mt-3 text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </p>

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