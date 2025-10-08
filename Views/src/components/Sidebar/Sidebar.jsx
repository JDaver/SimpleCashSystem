import { createContext, forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import './Sidebar.css';

const SidebarContext = createContext(null);

const Sidebar = ({
  isOpen,
  defaultOpen,
  side = 'right',
  dismissOnClickOutside = false,
  children,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isControlled = isOpen !== undefined;
  const actualIsOpen = isControlled ? isOpen : internalOpen;

  const onOpenChangeHandler = useCallback(
    newVal => {
      if (!isControlled) {
        setInternalOpen(newVal);
      }
      onOpenChange?.(newVal);
    },
    [isControlled, onOpenChange]
  );

  const contextValue = useMemo(
    () => ({
      isOpen: actualIsOpen,
      side,
      dismissOnClickOutside,
      onOpenChange: onOpenChangeHandler,
    }),
    [actualIsOpen, side, dismissOnClickOutside, onOpenChangeHandler]
  );

  return <SidebarContext.Provider value={contextValue}>{children}</SidebarContext.Provider>;
};

Sidebar.displayName = 'Sidebar';

// helper function for using Sidebar context

export function useSidebarContext() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('Sidebar components needs to be wrapped in <Sidebar>.');
  }

  return context;
}

// ------------ Frame component

const SidebarFrame = ({ className, children, ...props }) => {
  return (
    <aside {...props}>
      <div className="sidebar__frame">{children}</div>
    </aside>
  );
};

Sidebar.Frame = SidebarFrame;
SidebarFrame.displayName = 'SidebarFrame';

// ------------ Header component

const SidebarHeader = forwardRef(({ children, ...props }, ref) => (
  <header ref={ref} className="sidebar__header" {...props}>
    {children}
  </header>
));

Sidebar.Header = SidebarHeader;
SidebarHeader.displayName = 'SidebarHeader';

// ------------ Title component

const SidebarTitle = ({ variant, border, clamp, truncate, children, ...props }) => {
  return (
    <h2 className="sidebar__title" {...props}>
      {children}
    </h2>
  );
};

Sidebar.Title = SidebarTitle;
SidebarTitle.displayName = 'SidebarTitle';

// ------------ Close component

const SidebarClose = ({ children }) => {
  const { onOpenChange } = useSidebarContext();

  const handleClose = useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  return React.cloneElement(children, {
    onClick: e => {
      if (children.props.onClick) children.props.onClick(e);
      handleClose();
    },
  });
};

Sidebar.Close = SidebarClose;
SidebarClose.displayName = 'SidebarClose';

// ------------ Body component

const SidebarBody = ({ direction, gap, align, flexWrap, justify, children, ...props }) => {
  return (
    <div className="sidebar__body" {...props}>
      {children}
    </div>
  );
};

Sidebar.Body = SidebarBody;
SidebarBody.displayName = 'SidebarBody';

// ------------ Section component

const SidebarSection = ({ children, ...props }) => {
  return (
    <div className="sidebar__section" {...props}>
      {children}
    </div>
  );
};

Sidebar.Section = SidebarSection;
SidebarSection.displayName = 'SidebarSection';

// ------------ Content component

const SidebarContent = ({ children, ...props }) => {
  return (
    <div className="sidebar__content" {...props}>
      {children}
    </div>
  );
};

Sidebar.Content = SidebarContent;
SidebarContent.displayName = 'SidebarContent';

// ------------ Footer component

const SidebarFooter = ({ children, ...props }) => {
  return (
    <footer className="sidebar__footer" {...props}>
      {children}
    </footer>
  );
};

Sidebar.Footer = SidebarFooter;
SidebarFooter.displayName = 'SidebarFooter';

export default Sidebar;
