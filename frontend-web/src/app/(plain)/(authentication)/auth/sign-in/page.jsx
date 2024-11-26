import { Card } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';
import PageMetaData from '@/components/PageMetaData';
import AuthLayoutSignIn from '../components/AuthLayoutSignIn';
const SignIn = () => {
  return <>
      <PageMetaData title='Sign In' />
      <AuthLayoutSignIn>
        <Card className="card-body rounded-3  text-center p-4 p-sm-5">
          <h1 className="mb-2">Sign in</h1>
          <p className="mb-0">
            Don&apos;t have an account?<Link to="/auth/sign-up"> Click here to sign up</Link>
          </p>
          <LoginForm />
        </Card>
      </AuthLayoutSignIn>
    </>;
};
export default SignIn;