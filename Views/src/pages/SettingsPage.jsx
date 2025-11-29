import { lazy, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTheme } from '@contexts/Theme';
import { loadThemedComponent } from '@utils/LoadThemedComponent';

const Preferences = lazy(() => import('@pages/settings/Preferences'));
const Overview = lazy(() => import('@pages/settings/Overview'));
const Session = lazy(() => import('@pages/settings/Session'));
const Users = lazy(() => import('@pages/settings/Users'));
const PdfConfig = lazy(() => import('@pages/settings/PdfConfig'));
const Format = lazy(() => import('@pages/settings/Format'));
const Refund = lazy(() => import('@pages/settings/Refund'));

function SettingsPage() {
  const { theme } = useTheme();
  const Settings = useMemo(() => loadThemedComponent(theme, 'Settings'), [theme]);

  return (
    <Routes>
      <Route path="/" element={<Settings />}>
        <Route index element={<Overview />} />
        <Route path="general">
          <Route path="preferences" element={<Preferences />} />
          <Route path="session" element={<Session />} />
        </Route>
        <Route path="receipts">
          <Route path="format" element={<Format />} />
          <Route path="refund" element={<Refund />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="pdf-config" element={<PdfConfig />} />
      </Route>
    </Routes>
  );
}

export default SettingsPage;
