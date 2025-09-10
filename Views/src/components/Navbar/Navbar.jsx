import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/useTheme';
import './Navbar.css';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import Dropdown from '@components/Dropdown';

const navLocations = [
  { id: 'main', label: 'Cassa', to: '/' },
  { id: 'manage', label: 'Modifica articoli', to: '/ManageItem' },
  { id: 'collection', label: 'Storico', to: '/Collection' },
  // { id: 'settings', label: 'Impostazioni', to: '/SettingsPage' },
];

const settingsArr = [
  { id: 1, name: 'Generali' },
  { id: 2, name: 'Utente' },
  { id: 3, name: 'Scarica' },
  { id: 4, name: 'Elimina' },
];
function Navbar() {
  const { theme } = useTheme();
  const [settings, setSettings] = useState('');

  return (
    <nav className={`navbar ${theme}`}>
      <ul className="navbar__list">
        {navLocations.map(location => (
          <li className="navbar__item" key={location.id}>
            <NavLink
              key={location.id}
              className={({ isActive }) => (isActive ? 'navbar__link active' : 'navbar__link')}
              to={location.to}
              end
            >
              {location.label}
            </NavLink>
          </li>
        ))}
        <Dropdown side={'left'} selected={settings} onChange={setSettings}>
          <Dropdown.Trigger>
            <Cog6ToothIcon color="white" width={30} height={20} />
            <span style={{ color: 'white' }}>Impostazioni</span>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {settingsArr.map(setting => {
              return (
                <Dropdown.Item key={setting.id} option={setting}>
                  {setting.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Content>
        </Dropdown>
      </ul>
    </nav>
  );
}

export default memo(Navbar);
