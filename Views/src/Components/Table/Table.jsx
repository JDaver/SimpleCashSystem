import { useCallback, useEffect, useRef, useState } from 'react';
import { useTableGroupContext } from '../TableGroup/TableGroup';
import './Table.css';

function Table({ id, icon, title, children, ...props }) {
  const { activeId, setActiveId } = useTableGroupContext();
  const active = activeId === id;
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  const handleClick = useCallback(() => {
    setActiveId(id);
  }, [id]);

  // Measure height to enable smooth animation on the content div
  useEffect(() => {
    if (contentRef.current) {
      setHeight(active ? contentRef.current.scrollHeight : 0);
    }
  }, [active]);

  return (
    <div className={`table ${active ? 'active' : ''}`} {...props}>
      <div className="table__header" onClick={handleClick}>
        <span className="table__title">{title}</span>
        <span className="table__icon">{icon}</span>
      </div>
      <div
        ref={contentRef}
        className="table__body"
        style={{
          maxHeight: `${height}px`,
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
          opacity: active ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Table;
