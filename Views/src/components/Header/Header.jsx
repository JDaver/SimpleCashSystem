import Navbar from '@components/Navbar';
import ThemeSwitcher from '@components/ThemeSwitcher';
import { useTheme } from '@contexts/Theme';
import './Header.css';
import { useAuthContext } from '@contexts/Auth';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { avatars } from '@utils/constants/avatars';

function Header() {
  const { theme } = useTheme();
  const { session, handleLogout } = useAuthContext();

  <img src={avatars[0]} alt="avatar" />;

  return (
    <header className={`header ${theme}`} role="banner" id="header-transition">
      <div className="header__wrapper">
        <ThemeSwitcher />
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Navbar />
          <div style={{ alignItems: 'center', display: 'flex', gap: '0.5rem', color: 'white' }}>
            <span>
              <p>Ciao, {session.username}</p>
            </span>
            <span>
              <img src={session.avatar} alt="avatar" height={50} width={50} />
            </span>
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
