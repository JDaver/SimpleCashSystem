import LoginForm from '@components/LoginForm';
import PageWrapper from '@components/PageWrapper';
import SelectUser from '../components/SelectUser/SelectUser';

function Login() {
  return (
    <PageWrapper className="login-page">
      {/* <LoginForm /> */}
      <SelectUser />
    </PageWrapper>
  );
}

export default Login;
