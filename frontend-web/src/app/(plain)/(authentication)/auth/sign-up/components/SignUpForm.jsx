import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, FormCheck, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const SignUpForm = () => {
  const [firstPassword, setFirstPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role

  const roles = [
    { name: 'College Admin', value: 'college_admin' },
    { name: 'Student', value: 'student' },
    { name: 'Alumni', value: 'alumni' }
  ];

  const signUpSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
  });

  const {
    control,
    handleSubmit,
    watch,
    getValues
  } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  useEffect(() => {
    setFirstPassword(getValues().password);
  }, [watch('password')]);

  const onSubmit = (data) => {
    const signUpData = { ...data, role };
    console.log('Sign-up Data:', signUpData); // Handle sign-up logic here
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <TextFormInput
          name="email"
          control={control}
          containerClassName="input-group-lg"
          placeholder="Enter your email"
        />
        <small>We&apos;ll never share your email with anyone else.</small>
      </div>
      <div className="mb-3 position-relative">
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
      <PasswordFormInput
        name="confirmPassword"
        control={control}
        size="lg"
        containerClassName="mb-3"
        placeholder="Confirm password"
      />
      <div className="mb-3">
        <label className="form-label me-2">Select Role</label>
        <ButtonGroup>
          {roles.map((r) => (
            <ToggleButton
              key={r.value}
              id={`role-${r.value}`}
              type="radio"
              variant="outline-primary"
              name="role"
              value={r.value}
              checked={role === r.value}
              onChange={(e) => setRole(e.currentTarget.value)}
            >
              {r.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div className="mb-3 text-start">
        <FormCheck label="Keep me signed in" id="termAndCondition" />
      </div>
      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg">
          Sign me up
        </Button>
      </div>
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
