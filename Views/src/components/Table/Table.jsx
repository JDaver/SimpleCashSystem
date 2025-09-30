import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import './Table.css';

const TableContext = createContext(null);

const Table = ({ defaultActive = null, activeId, children, onChange, ...props }) => {
  const [internalActiveId, setInternalActiveId] = useState(defaultActive);
  const isControlled = activeId !== undefined && activeId !== null;
  const actualActiveId = isControlled ? activeId : internalActiveId;

  const handleId = id => {
    if (!isControlled) {
      setInternalActiveId(id);
    }
    onChange?.(id);
  };
  const contextValue = {
    actualActiveId,
    handleId,
  };
  return (
    <TableContext.Provider value={contextValue}>
      <div className="tablegroup" {...props}>
        {children}
      </div>
    </TableContext.Provider>
  );
};

Table.displayName = 'Table';

// helper function for table context

export function useTableContext() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTableContext must be used within a <Table> component.');
  }
  return context;
}

// --------------- Item Component

const TableItemComponent = ({ id, icon, title, children, ...props }) => {
  const { actualActiveId, handleId } = useTableContext();
  const active = actualActiveId === id;
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  const handleClick = useCallback(() => {
    handleId(id);
  }, [handleId, id]);

  // Measure height to enable smooth animation on the content div
  useEffect(() => {
    if (!contentRef.current) return;
    if (active) {
      setHeight(contentRef.current.scrollHeight);
      const onTransitionEnd = () => setHeight('auto');
      const el = contentRef.current;
      el.addEventListener('transitionend', onTransitionEnd);
      return () => el.removeEventListener('transitionend', onTransitionEnd);
    } else {
      setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [active]);

  const buttonId = `table-button-${id}`;
  const panelId = `table-panel-${id}`;

  return (
    <div className={`table ${active ? 'active' : ''}`} {...props}>
      <div
        role="button"
        id={buttonId}
        aria-expanded={active}
        aria-controls={panelId}
        className="table__header"
        onClick={handleClick}
      >
        <span className="table__title">{title}</span>
        <span className="table__icon">{icon}</span>
      </div>
      <div
        ref={contentRef}
        id={panelId}
        aria-labelledby={buttonId}
        role="region"
        className="table__body"
        style={{
          maxHeight: `${height}px`,
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
          opacity: active ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const TableItem = React.memo(TableItemComponent);
TableItem.displayName = 'TableItem';

Table.Item = TableItem;

// --------------- Controls Component

const TableControls = ({ children, ...props }) => {
  return (
    <div className="table__controls" {...props}>
      {children}
    </div>
  );
};

Table.Controls = TableControls;
TableControls.displayName = 'TableControls';

// --------------- Section Component

const TableSection = ({ children, ...props }) => {
  return (
    <div className="table__section" {...props}>
      {children}
    </div>
  );
};

Table.Section = TableSection;
TableSection.displayName = 'TableSection';

// --------------- Content Component

const TableContentComponent = ({ className, children, ...props }) => {
  const combinedClassName = `table__content ${className ? ' ' + className : ''}`;
  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

const TableContent = React.memo(TableContentComponent);
Table.Content = TableContent;
TableContent.displayName = 'TableContent';

export default Table;
