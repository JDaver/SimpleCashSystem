import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@contexts/Theme';
import { Collection, ManageItem } from '../AppWrapper/AppWrapper';
import './Navbar.css';

const navLocations = [
  { id: 'main', label: 'Cassa', to: '/' },
  { id: 'manage', label: 'Modifica articoli', to: '/manageitem' },
  { id: 'collection', label: 'Storico', to: '/collection' },
  { id: 'settings', label: 'Impostazioni', to: '/settings' },
];

function Navbar() {
  const { theme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <ul className="navbar__list">
        {navLocations.map(location => (
          <li className="navbar__item" key={location.id}>
            <NavLink
              key={location.id}
              className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
              to={location.to}
              end={location.id !== 'settings'}
              onTouchStart={() => {
                if (location.id === 'manage' && ManageItem.prefetch) ManageItem.prefetch();
                if (location.id === 'collection' && Collection.prefetch) Collection.prefetch();
              }}
            >
              {location.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(Navbar);
