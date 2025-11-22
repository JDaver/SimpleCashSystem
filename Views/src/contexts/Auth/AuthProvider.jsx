import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { login, signin } from '../../utils/userService';
import { useQueryClient } from '@tanstack/react-query';
import { sessionEvents } from '@utils/sessionEvents';

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

  // ------------------- AUTH HANDLERS -------------------

  const handleSignin = useCallback(
    async sessionData => {
      try {
        const { new_username, new_email, new_avatar } = sessionData || {};
        const result = await signin(new_username, new_email, new_avatar);
        const { currentToken, username, currentEmail, expiresAt, avatar } = result;

        if (!result?.currentToken) {
          throw new Error('Login fallito: token mancante');
        }
        const sessionToken = {
          token: currentToken,
          username,
          email: currentEmail,
          token_expires: new Date(expiresAt).getTime(),
          avatar: avatar,
        };
        queryClient.invalidateQueries();
        sessionStorage.setItem('session', JSON.stringify(sessionToken));
        setSession(sessionToken);

        navigate('/');
      } catch (err) {
        throw new Error(err);
      }
    },
    [navigate]
  );

  const handleLogin = useCallback(
    async sessionData => {
      const { id, name } = sessionData;
      try {
        const result = await login(name);
        console.log('login', result);
        if (!result?.currentToken) {
          throw new Error('Login fallito: token mancante');
        }
        const { currentToken, username, currentEmail, expiresAt, avatar } = result;

        const sessionToken = {
          token: currentToken,
          username,
          email: currentEmail,
          token_expires: new Date(expiresAt).getTime(),
          avatar: avatar,
        };
        queryClient.invalidateQueries();
        sessionStorage.setItem('session', JSON.stringify(sessionToken));
        setSession(sessionToken);
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    },
    [navigate]
  );

  const [expiresAt, setExpiresAt] = useState(session?.token_expires || null);

  // ------------------- UNAUTHORIZED HANDLERS -------------------

  useEffect(() => {
    const handler = () => {
      if (isSessionExpired || !session) return;
      setExpiresAt(Date.now() - 1000);
    };

    sessionEvents.addEventListener('session-expired', handler);
    return () => sessionEvents.removeEventListener('session-expired', handler);
  }, [isSessionExpired, session]);

  const handleLogout = useCallback(() => {
    queryClient.invalidateQueries();
    sessionStorage.removeItem('session');
    setSession(null);
  }, []);

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
  }, [expiresAt]);

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
