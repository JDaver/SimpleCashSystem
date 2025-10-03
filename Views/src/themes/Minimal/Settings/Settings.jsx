import { NavLink, Outlet } from 'react-router-dom';
import {
  ArrowDownTrayIcon,
  ReceiptPercentIcon,
  TrashIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Sidebar from '@components/Sidebar';
import './Settings.css';

const SettingsDiv = [
  { id: 'generali', label: 'Preferenze', icon: <WrenchScrewdriverIcon />, to: 'general' },
  { id: 'scontrini', label: 'Scontrini', icon: <ReceiptPercentIcon />, to: 'receipts' },
  { id: 'utenti', label: 'Utenti', icon: <UsersIcon />, to: 'users' },
  { id: 'scarica', label: 'Scarica', icon: <ArrowDownTrayIcon />, to: 'download' },
  { id: 'elimina', label: 'Elimina', icon: <TrashIcon />, to: 'delete' },
];

function Settings() {
  return (
    <div className="settings__wrapper">
      <Sidebar>
        <Sidebar.Frame>
          <Sidebar.Body>
            <Sidebar.Header>
              <Sidebar.Title>Impostazioni</Sidebar.Title>
            </Sidebar.Header>
            <Sidebar.Content>
              <Sidebar.Section>
                {SettingsDiv.map(location => (
                  <NavLink
                    key={location.id}
                    className={({ isActive }) =>
                      isActive ? 'settings__link active' : 'settings__link'
                    }
                    to={location.to}
                  >
                    <span className="settings__icon">{location.icon}</span>
                    {location.label}
                  </NavLink>
                ))}
              </Sidebar.Section>
            </Sidebar.Content>
            <Sidebar.Footer></Sidebar.Footer>
          </Sidebar.Body>
        </Sidebar.Frame>
      </Sidebar>
      <div className="settings__content">
        <Outlet />
      </div>
    </div>
  );
}

export default Settings;
