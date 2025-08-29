import Navbar from '@components/Navbar';
import ThemeSwitcher from '@components/ThemeSwitcher';
import { useTheme } from '@contexts/useTheme';
import './Header.css';

function Header() {
  const { theme } = useTheme();
  return (
    <header className={`header ${theme}`} role="banner" id="header-transition">
      <div className="header__wrapper">
        <ThemeSwitcher />
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
