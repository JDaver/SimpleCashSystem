import { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useTheme } from '@contexts/Theme';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import General from '@themes/Minimal/Settings/Roots/General';
import Receipts from '@themes/Minimal/Settings/Roots/Receipts';
import Users from '@themes/Minimal/Settings/Roots/Users';
import Download from '@themes/Minimal/Settings/Roots/Download';
import Delete from '@themes/Minimal/Settings/Roots/Delete';

function SettingsPage() {
  const { theme } = useTheme();
  const Settings = useMemo(() => loadThemedComponent(theme, 'Settings'), [theme]);

  return (
    <Routes>
      <Route path="/" element={<Settings />}>
        <Route index element={<Navigate to="general" replace />} />
        <Route path="general" element={<General />} />
        <Route path="receipts" element={<Receipts />} />
        <Route path="users" element={<Users />} />
        <Route path="download" element={<Download />} />
        <Route path="delete" element={<Delete />} />
      </Route>
    </Routes>
  );
}

export default SettingsPage;
