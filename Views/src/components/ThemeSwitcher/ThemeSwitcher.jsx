import { memo, useCallback } from 'react';
import { useTheme } from '@contexts/useTheme';
import './ThemeSwitcher.css';

function ThemeSwitcher() {
  const { theme, switchTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'minimal' ? 'vibrant' : 'minimal';
    setTimeout(() => {
      switchTheme(newTheme);
    }, 50);
  }, [theme, switchTheme]);

  return (
    <div className="theme-switcher">
      <label className="theme-switcher__content">
        <input
          id="theme-switcher"
          type="checkbox"
          onChange={toggleTheme}
          defaultChecked={theme === 'minimal'}
        />
        <span className="theme-switcher__slider" />
      </label>
      <p className="theme-switcher__label">{theme}</p>
    </div>
  );
}

export default memo(ThemeSwitcher);
