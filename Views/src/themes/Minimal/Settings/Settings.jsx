import { Link, Outlet, useLocation } from 'react-router-dom';
import { memo } from 'react';
import './Settings.css';
import SettingsSidebar from '../../../components/SettingsSidebar';

function Settings() {
  return (
    <div className="settings__wrapper">
      <SettingsSidebar />

      <div className="settings__content">
        <Outlet />
      </div>
    </div>
  );
}

export default memo(Settings);
