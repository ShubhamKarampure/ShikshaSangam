import { Card } from 'react-bootstrap';
import ForgotPassForm from './components/ForgotPassForm';
import AuthLayout from '../components/AuthLayout';
import PageMetaData from '@/components/PageMetaData';
const ForgotPassword = () => {
  return <>
      <PageMetaData title='Forgot Password' />
      <AuthLayout>
        <Card className="card-body rounded-3 text-center p-4 p-sm-5">
          <h1 className="mb-2">Forgot password?</h1>
          <p>Enter the email address associated with account.</p>
          <ForgotPassForm />
        </Card>
      </AuthLayout>
    </>;
};
export default ForgotPassword;