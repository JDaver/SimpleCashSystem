import { createContext, useContext, useState } from 'react';
import './TableGroup.css';

const TableGroupContext = createContext(null);

const TableGroup = ({ defaultActive = null, children, ...props }) => {
  const [activeId, setActiveId] = useState(defaultActive);
  const contextValue = {
    activeId,
    setActiveId,
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
