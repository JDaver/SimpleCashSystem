import { NavLink, useLocation } from 'react-router-dom';
import { memo } from 'react';
import {
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ReceiptPercentIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Sidebar from '@components/Sidebar';
import SettingsSidebarItem from './SettingsSidebarItem';
import SettingsBreadcrumb from './SettingsBreadcrumb';
import './SettingsSidebar.css';

const SETTINGS_PAGES = [
  {
    id: 'generali',
    label: 'Generali',
    icon: <WrenchScrewdriverIcon width={30} height={30} />,
    submenu: [
      {
        id: 'preferenze',
        label: 'Preferenze',
        to: 'general/preferences',
      },
      { id: 'sessione', label: 'Sessione', to: 'general/session' },
    ],
    to: 'general',
  },
  {
    id: 'scontrini',
    label: 'Scontrini',
    icon: <ReceiptPercentIcon width={30} height={30} />,
    submenu: [
      {
        id: 'formatta',
        label: 'Formatta',
        to: 'receipts/format',
      },
      { id: 'reso', label: 'Reso', to: 'receipts/refund' },
    ],
    to: 'receipts',
  },
  {
    id: 'utenti',
    label: 'Utenti',
    icon: <UsersIcon width={30} height={30} />,
    to: 'users',
  },
  {
    id: 'pdf',
    label: 'PDF',
    icon: <ArrowDownTrayIcon width={30} height={30} />,
    to: 'pdf-config',
  },
];

function SettingsSidebar() {
  const { pathname } = useLocation();

  function findBreadcrumbs(pathname, settings) {
    let segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'settings') segments.shift();

    if (segments.length === 0) {
      return [{ label: 'Riepilogo', url: '/settings' }];
    }

    const crumbs = [];
    let currentLevel = settings;

    for (const segment of segments) {
      const match = currentLevel.find(item => item.to.split('/').pop() === segment);
      if (match) {
        const url = match.to.startsWith('/') ? match.to : '/settings/' + match.to;
        crumbs.push({ label: match.label, url });
        currentLevel = match.submenu || [];
      } else {
        crumbs.push({ label: segment, url: '/settings/' + segment });
        currentLevel = [];
      }
    }

    return crumbs;
  }

  const crumbs = findBreadcrumbs(pathname, SETTINGS_PAGES);
  return (
    <Sidebar>
      <Sidebar.Frame>
        <Sidebar.Body>
          <Sidebar.Header>
            <SettingsBreadcrumb crumbs={crumbs} />
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Section>
              {SETTINGS_PAGES.map(location => (
                <SettingsSidebarItem key={location.id} location={location} />
              ))}
            </Sidebar.Section>
          </Sidebar.Content>
          <Sidebar.Footer>
            <NavLink className="settings__back-link" to="/settings">
              <span className="settings__icon">
                <ArrowLeftIcon width={30} height={30} />
              </span>
              Riepilogo
            </NavLink>
          </Sidebar.Footer>
        </Sidebar.Body>
      </Sidebar.Frame>
    </Sidebar>
  );
}

export default memo(SettingsSidebar);
