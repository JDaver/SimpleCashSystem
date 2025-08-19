import { useCallback } from 'react';
import { useTheme } from '../../contexts/useTheme';
import './ThemeSwitcher.css';

function ThemeSwitcher() {
  const { theme, switchTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    // nomi dei temi non definitivi
    const newTheme = theme === 'Minimal' ? 'Vibrant' : 'Minimal';
    switchTheme(newTheme);
  }, [theme, switchTheme]);

  return (
    <div className="theme-switcher">
      <label className="theme-switcher__content">
        <input type="checkbox" onClick={toggleTheme} defaultChecked={theme === 'Minimal'} />
        <span className="theme-switcher__slider" />
      </label>
      <p className="theme-switcher__label">{theme}</p>
    </div>
  );
}

export default ThemeSwitcher;
