import { useEffect } from 'react';
import PageWrapper from '@components/PageWrapper';
import LoginForm from '@components/LoginForm';
import SelectUser from '@components/SelectUser';
import { Home } from '@components/AppWrapper/AppWrapper';

function Login() {
  useEffect(() => {
    Home.preload();
  }, []);

  return (
    <PageWrapper className="login-page">
      {/* <LoginForm /> */}
      <SelectUser />
    </PageWrapper>
  );
}

export default Login;
