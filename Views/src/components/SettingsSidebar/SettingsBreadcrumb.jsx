import { Link } from 'react-router-dom';
import Breadcrumb from '@components/Breadcrumb';
import { memo } from 'react';

function SettingsBreadcrumb({ crumbs }) {
  return (
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
  );
}

export default memo(SettingsBreadcrumb);
