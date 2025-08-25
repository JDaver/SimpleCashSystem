import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
   const navLocations = [
    { id: 'main', label: 'Cassa', to: '/' },
    { id: 'manage', label: 'Modifica articoli', to: '/ManageItem' },
    { id: 'collection', label: 'Storico', to: '/Collection' },
    { id: 'terminate', label: 'Chiusura giornata', to: '/TerminateSession' }
   ]

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {navLocations.map(location =>(
          <li className="navbar__item">
          <NavLink key={location.id}
            className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
            to={location.to} end>
          {location.label}
          </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(Navbar);
