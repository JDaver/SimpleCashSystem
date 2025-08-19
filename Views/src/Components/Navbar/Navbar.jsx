import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { memo } from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink
            className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
            to="/"
            end
          >
            Cassa
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
            to="/ManageItem"
          >
            Modifica articoli
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
            to="/Collection"
          >
            Storico
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
            to="/TerminateSession"
          >
            Chiusura giornata
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default memo(Navbar);
