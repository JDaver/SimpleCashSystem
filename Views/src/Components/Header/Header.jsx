import Navbar from '../Navbar/Navbar';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import './Header.css';

function Header() {
  return (
    <header className="header" id="header-transition">
      <div className="header__wrapper">
        <ThemeSwitcher />
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
