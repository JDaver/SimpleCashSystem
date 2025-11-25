import { NavLink, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState, useCallback, memo, useMemo } from 'react';
import './Settings.css';

function SidebarItem({ location }) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const hasSubmenu = location?.submenu?.length > 0;

  const isNestedLinkActive = useMemo(() => {
    if (!hasSubmenu) return false;
    return pathname.startsWith(`/settings/${location.to}/`);
  }, [pathname, location.to, hasSubmenu]);

  const isSingleLinkActive = useMemo(() => {
    return !hasSubmenu && pathname === `/settings/${location.to}`;
  }, [pathname, location.to, hasSubmenu]);

  const toggleSubmenu = useCallback(() => {
    if (!hasSubmenu) return;
    setIsOpen(prev => !prev);
  }, [hasSubmenu]);

  return (
    <div className="settings__item" style={{ width: '100%' }}>
      {hasSubmenu ? (
        <div
          className={`settings__link ${isNestedLinkActive || isSingleLinkActive ? 'active' : ''}`}
          onClick={toggleSubmenu}
        >
          <span className="settings__icon">{location.icon}</span>
          <span className="settings__label">{location.label}</span>
          <ChevronRightIcon
            width={20}
            height={20}
            className={`settings__chevron ${isOpen ? 'rotate' : ''}`}
          />
        </div>
      ) : (
        <NavLink
          className={({ isActive }) => (isActive ? 'settings__link active' : 'settings__link')}
          to={location.to}
        >
          <span className="settings__icon">{location.icon}</span>
          {location.label}
        </NavLink>
      )}
      {hasSubmenu && isOpen && (
        <ul className="settings__submenu">
          {location.submenu.map(sub => (
            <li key={sub.id}>
              <NavLink
                to={sub.to}
                className={({ isActive }) =>
                  isActive ? 'settings__sublink active' : 'settings__sublink'
                }
              >
                {sub.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default memo(SidebarItem);
