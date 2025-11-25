import { createContext, useContext, useMemo } from 'react';
import './Breadcrumb.css';

const BreadcrumbContext = createContext(null);

const Breadcrumb = ({
  orientation = 'horizontal' || 'vertical',
  separator,
  className,
  children,
  ...props
}) => {
  const defaultSeparator = orientation === 'vertical' ? '↓' : '/';
  const contextValue = useMemo(
    () => ({
      orientation,
      separator: separator ?? defaultSeparator,
    }),
    [orientation, separator, defaultSeparator]
  );

  return (
    <BreadcrumbContext.Provider value={contextValue}>
      <nav aria-label="Breadcrumb" {...props}>
        <ol role="list" className="breadcrumb">
          {children}
        </ol>
      </nav>
    </BreadcrumbContext.Provider>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

// helper function for using Breadcrumb context

export function useBreadcrumbContext() {
  const context = useContext(BreadcrumbContext);

  if (!context) {
    throw new Error('Breadcrumb components needs to be wrapped in <Breadcrumb>.');
  }

  return context;
}

// ------------ Item component

const BreadcrumbItem = ({ children, ...props }) => {
  return <li {...props}>{children}</li>;
};

Breadcrumb.Item = BreadcrumbItem;
BreadcrumbItem.displayName = 'BreadcrumbItem';

// ------------ Link component

const BreadcrumbLink = ({ isCurrent, children, ...props }) => {
  if (isCurrent) {
    return (
      <span aria-current="page" tabIndex={-1} className="breadcrumb__link current" {...props}>
        {children}
      </span>
    );
  }
  return (
    <a className="breadcrumb__link" {...props}>
      {children}
    </a>
  );
};

Breadcrumb.Link = BreadcrumbLink;
BreadcrumbLink.displayName = 'BreadcrumbLink';

// ------------ Separator component

const BreadcrumbSeparator = ({ children, ...props }) => {
  const { separator } = useBreadcrumbContext();
  return (
    <span aria-hidden="true" className="breadcrumb__separator" {...props}>
      {children ?? separator}
    </span>
  );
};

Breadcrumb.Separator = BreadcrumbSeparator;
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export default Breadcrumb;
