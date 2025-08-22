import Navbar from '@themes/Vibrant/Navbar';
import ThemeSwitcher from '@components/ThemeSwitcher';
import './Header.css';

function Header() {
  return (
    <header className="header-vibrant" role="banner" id="header-transition">
      <div className="header__wrapper">
        <ThemeSwitcher />
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
