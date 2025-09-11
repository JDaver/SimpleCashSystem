import { createContext, useContext, useState } from 'react';
import './TableGroup.css';

const TableGroupContext = createContext(null);

const TableGroup = ({ defaultActive = null, activeId, children, onChange, ...props }) => {
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
    <TableGroupContext.Provider value={contextValue}>
      <div className="tablegroup" {...props}>
        {children}
      </div>
    </TableGroupContext.Provider>
  );
};

export function useTableGroupContext() {
  const context = useContext(TableGroupContext);
  if (!context) {
    throw new Error('useTableGroupContext must be used within a <TableGroup> component.');
  }
  return context;
}

export default TableGroup;
