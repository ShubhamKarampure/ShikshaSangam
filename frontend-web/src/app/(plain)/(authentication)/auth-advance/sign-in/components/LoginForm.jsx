import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Link } from 'react-router-dom';
import { Button, FormCheck } from 'react-bootstrap';
import useSignIn from './useSignIn';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordFormInput from '@/components/form/PasswordFormInput';
const LoginForm = () => {
  const {
    loading,
    login,
    control
  } = useSignIn();
  return <form className="mt-4" onSubmit={login}>
      <TextFormInput name="email" type="email" placeholder="Enter email" control={control} containerClassName="mb-3 input-group-lg" />
      <div className="mb-3">
        {/* @ts-ignore */}
        <PasswordFormInput name="password" placeholder="Enter password" control={control} size="lg" containerClassName="w-100" />
      </div>
      <div className="mb-3 d-sm-flex justify-content-between">
        <div>
          <FormCheck type="checkbox" label="Remember me?" id="rememberCheck" />
        </div>
        <Link to="/auth-advance/forgot-pass">Forgot password?</Link>
      </div>
      <div className="d-grid">
        <Button variant="primary-soft" size="lg" type="submit" disabled={loading}>
          Login
        </Button>
      </div>
      <p className="mb-0 mt-3">
        ©{currentYear}
        <a target="_blank" href={developedByLink}>
          {developedBy}.
        </a>
        All rights reserved
      </p>
    </form>;
};
export default LoginForm;