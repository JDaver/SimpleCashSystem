import Navbar from '@components/Navbar';
import ThemeSwitcher from '@components/ThemeSwitcher';
import { useTheme } from '@contexts/Theme';
import './Header.css';
import { useAuthContext } from '@contexts/Auth';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';

function Header() {
  const { theme } = useTheme();
  const { session, handleLogout } = useAuthContext();
  return (
    <header className={`header ${theme}`} role="banner" id="header-transition">
      <div className="header__wrapper">
        <ThemeSwitcher />
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Navbar />
          <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem', color: 'white' }}>
            <span>Ciao, {session.username}</span>
            <button onClick={handleLogout}>
              <ArrowLeftStartOnRectangleIcon width={30} height={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
