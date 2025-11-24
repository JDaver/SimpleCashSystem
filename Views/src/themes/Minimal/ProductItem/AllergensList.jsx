import React, { useCallback } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

const MemoInfoIcon = React.memo(InformationCircleIcon);

function AllergensList({ allergens = [], prefetchModal, onToggle }) {
  if (!allergens || allergens.length === 0) return null;

  const handleTouchActions = useCallback(e => {
    e.stopPropagation();
  }, []);

  const handlePrefetch = useCallback(() => {
    prefetchModal?.();
  }, [prefetchModal]);

  return (
    <div
      className="allergens__row"
      onTouchStart={handleTouchActions}
      onTouchMove={handleTouchActions}
      onTouchEnd={handleTouchActions}
    >
      <ul className="allergens__list" onClick={onToggle} onTouchStart={handlePrefetch}>
        {allergens.map(item => (
          <li key={item} className="allergens__item">
            {item}
          </li>
        ))}
      </ul>
      <button className="allergens__info" type="button" onClick={onToggle}>
        <MemoInfoIcon width={25} height={25} color="oklch(51.3% 0.09 199.5)" />
        <span className="allergens__info-label">Mostra tutti</span>
      </button>
    </div>
  );
}

export default React.memo(AllergensList);
