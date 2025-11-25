import { Link, Outlet, useLocation } from 'react-router-dom';
import { memo } from 'react';
import {
  ArrowDownTrayIcon,
  ReceiptPercentIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Sidebar from '@components/Sidebar';
import Breadcrumb from '@components/Breadcrumb';
import SidebarItem from './SidebarItem';
import './Settings.css';

const SettingsDiv = [
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

function Settings() {
  const { pathname } = useLocation();

  function findBreadcrumbs(pathname, settings) {
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'settings') segments.shift();

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

  const crumbs = findBreadcrumbs(pathname, SettingsDiv);

  return (
    <div className="settings__wrapper">
      <Sidebar>
        <Sidebar.Frame>
          <Sidebar.Body>
            <Sidebar.Header>
              <Breadcrumb>
                {crumbs.map((crumb, idx) => (
                  <Breadcrumb.Item key={crumb.url}>
                    {idx === crumbs.length - 1 ? (
                      <Breadcrumb.Link isCurrent>{crumb.label}</Breadcrumb.Link>
                    ) : (
                      <>
                        <Breadcrumb.Link as={Link} to={crumb.url}>
                          {crumb.label}
                        </Breadcrumb.Link>
                        <Breadcrumb.Separator />
                      </>
                    )}
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </Sidebar.Header>

            <Sidebar.Content>
              <Sidebar.Section>
                {SettingsDiv.map(location => (
                  <SidebarItem key={location.id} location={location} />
                ))}
              </Sidebar.Section>
            </Sidebar.Content>
          </Sidebar.Body>
        </Sidebar.Frame>
      </Sidebar>

      <div className="settings__content">
        <Outlet />
      </div>
    </div>
  );
}

export default memo(Settings);
