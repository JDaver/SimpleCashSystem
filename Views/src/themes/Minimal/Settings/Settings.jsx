import { Outlet } from 'react-router-dom';
import { memo, Suspense } from 'react';
import SettingsSidebar from '@components/SettingsSidebar';
import DotsLoader from '@components/DotsLoader';
import './Settings.css';

function Settings() {
  return (
    <div className="settings__wrapper">
      <SettingsSidebar />
      <div className="settings__content">
        <Suspense fallback={<DotsLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default memo(Settings);
