import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { login, signin } from '../../utils/userService';
import { useQueryClient } from '@tanstack/react-query';

export const AuthProvider = ({ children }) => {
  const getInitialSession = () => {
    if (typeof window === 'undefined') return null;

    const storedSession = sessionStorage.getItem('session');
    if (!storedSession) return null;

    try {
      const parsed = JSON.parse(storedSession);
      if (parsed.token_expires && Date.now() < parsed.token_expires) {
        return parsed;
      } else {
        sessionStorage.removeItem('session');
        return null;
      }
    } catch (e) {
      sessionStorage.removeItem('session');
      return null;
    }
  };

  const [session, setSession] = useState(getInitialSession);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignin = useCallback(
    async sessionData => {
      const { new_username, new_email } = sessionData || {};

      const result = await signin(new_username, new_email);
      const { currentToken, username, currentEmail, expiresAt } = result;

      const sessionToken = {
        token: currentToken,
        username,
        email: currentEmail,
        token_expires: new Date(expiresAt).getTime(),
      };
      queryClient.invalidateQueries();
      sessionStorage.setItem('session', JSON.stringify(sessionToken));
      setSession(sessionToken);

      navigate('/');
    },
    [navigate]
  );

  const handleLogin = useCallback(
    async sessionData => {
      const { id, name } = sessionData;

      const result = await login(name);
      console.log('login', result);
      const { currentToken, username, currentEmail, expiresAt } = result;

      const sessionToken = {
        token: currentToken,
        username,
        email: currentEmail,
        token_expires: new Date(expiresAt).getTime(),
      };
      queryClient.invalidateQueries();
      sessionStorage.setItem('session', JSON.stringify(sessionToken));
      setSession(sessionToken);
      navigate('/');
    },
    [navigate]
  );

  const handleLogout = useCallback(() => {
    queryClient.invalidateQueries();
    sessionStorage.removeItem('session');
    setSession(null);
  }, []);

  const expiresAt = session?.token_expires;

  useEffect(() => {
    if (!expiresAt) return;

    const now = Date.now();
    const timeLeft = expiresAt - now;

    if (timeLeft <= 0) {
      setIsSessionExpired(true);
      return;
    }

    const timeout = setTimeout(() => {
      setIsSessionExpired(true);
    }, timeLeft);

    return () => clearTimeout(timeout);
  }, [expiresAt, handleLogout]);

  const contextValue = useMemo(
    () => ({
      session,
      isSessionExpired,
      setIsSessionExpired,
      handleSignin,
      handleLogin,
      handleLogout,
    }),
    [session, isSessionExpired, handleSignin, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
