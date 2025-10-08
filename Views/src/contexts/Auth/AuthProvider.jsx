import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const getInitialSession = () => {
    if (typeof window === 'undefined') return null;

    const storedSession = sessionStorage.getItem('session');
    if (!storedSession) return null;

    try {
      const parsed = JSON.parse(storedSession);
      const now = Date.now();

      if (parsed.expiresAt && now < parsed.expiresAt) {
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

  const handleLogin = useCallback(sessionData => {
    const sessionExpiryHours = 16;
    const expiresAt = Date.now() + sessionExpiryHours * 60 * 60 * 1000;

    const sessionWithExpiry = {
      ...sessionData,
      expiresAt,
    };

    sessionStorage.setItem('session', JSON.stringify(sessionWithExpiry));
    setSession(sessionWithExpiry);
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('session');
    setSession(null);
  }, []);

  const expiresAt = session?.expiresAt;

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
    () => ({ session, isSessionExpired, setIsSessionExpired, handleLogin, handleLogout }),
    [session, isSessionExpired, handleLogin, handleLogout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
