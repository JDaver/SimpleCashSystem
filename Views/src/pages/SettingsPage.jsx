import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useTheme } from '@contexts/Theme';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import Preferences from '@themes/Minimal/Settings/Roots/Preferences';
import Session from '@themes/Minimal/Settings/Roots/Session';
import Users from '@themes/Minimal/Settings/Roots/Users';
import PdfConfig from '@themes/Minimal/Settings/Roots/PdfConfig';
import Format from '@themes/Minimal/Settings/Roots/Format';
import Refund from '@themes/Minimal/Settings/Roots/Refund';

function SettingsPage() {
  const { theme } = useTheme();
  const Settings = useMemo(() => loadThemedComponent(theme, 'Settings'), [theme]);

  return (
    <Routes>
      <Route path="/" element={<Settings />}>
        <Route index element={<Navigate to="general/preferences" replace />} />
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
