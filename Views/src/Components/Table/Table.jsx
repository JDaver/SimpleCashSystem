import { useCallback } from 'react';
import { useTableGroupContext } from '../TableGroup/TableGroup';
import './Table.css';

function Table({ id, title, children, ...props }) {
  const { activeId, setActiveId } = useTableGroupContext();
  const active = activeId === id;

  const handleClick = useCallback(() => {
    setActiveId(id);
  }, [id]);

  return (
    <div className={`table ${active ? 'active' : ''}`} {...props}>
      <div className="table__header" onClick={handleClick}>
        {title}
      </div>
      <div className="table__body">{children}</div>
    </div>
  );
}

export default Table;
