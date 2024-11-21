import PasswordFormInput from '@/components/form/PasswordFormInput';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
const ForgotPassForm = () => {
  const [firstPassword, setFirstPassword] = useState('');
  const forgotPassSchema = yup.object({
    password: yup.string().required('Please enter your password')
  });
  const {
    control,
    handleSubmit,
    watch,
    getValues
  } = useForm({
    resolver: yupResolver(forgotPassSchema)
  });
  useEffect(() => {
    setFirstPassword(getValues().password);
  }, [watch('password')]);
  return <form className="mt-3" onSubmit={handleSubmit(() => {})}>
      <div className="mb-3">
        <PasswordFormInput name="password" control={control} size="lg" placeholder="Enter new password" />
        <div className="mt-2">
          <PasswordStrengthMeter password={firstPassword} />
        </div>
      </div>
      <div className="mb-3">
        <p>
          Back to <Link to="/auth/sign-in">Sign in</Link>
        </p>
      </div>
      <div className="d-grid">
        <Button variant="primary" size="lg" type="submit">
          Reset password
        </Button>
      </div>
      <p className="mb-0 mt-3">
        ©{currentYear}
        <Link target="_blank" to={developedByLink}>
          {developedBy}.
        </Link>
        All rights reserved
      </p>
    </form>;
};
export default ForgotPassForm;