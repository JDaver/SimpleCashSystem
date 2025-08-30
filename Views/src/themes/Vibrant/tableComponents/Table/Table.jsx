import { useCallback, useEffect, useRef, useState } from 'react';
import { useTableGroupContext } from '@themes/Vibrant/tableComponents/TableGroup';
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
}

export default Table;
