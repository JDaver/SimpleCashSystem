import { useEffect, useState } from 'react';
import ThemeContext from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('appTheme') || 'nomeTema';
  });

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const switchTheme = newTheme => setTheme(newTheme);

  const contextValue = {
    theme,
    switchTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
