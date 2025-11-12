import React, { useEffect, useRef, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const MemoPlusIcon = React.memo(PlusIcon);

function AllergensList({ allergens = [], onToggle }) {
  const [visibleAllergens, setVisibleAllergens] = useState(allergens);
  const [hiddenCount, setHiddenCount] = useState(0);
  const containerRef = useRef(null);

  const calculateVisibleAllergens = () => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children);
    let usedWidth = 0;
    let lastVisibleIndex = children.length;

    for (let i = 0; i < children.length; i++) {
      const childWidth =
        children[i].offsetWidth + parseFloat(getComputedStyle(children[i]).marginRight || 0);
      if (usedWidth + childWidth > container.offsetWidth) {
        lastVisibleIndex = i;
        break;
      }
      usedWidth += childWidth;
    }

    if (lastVisibleIndex < allergens.length) {
      setVisibleAllergens(allergens.slice(0, lastVisibleIndex));
      setHiddenCount(allergens.length - lastVisibleIndex);
    } else {
      setVisibleAllergens(allergens);
      setHiddenCount(0);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleAllergens();
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [allergens]);

  if (!allergens || allergens.length === 0) return null;

  return (
    <div className="allergens__list">
      <ul
        className={`allergens__list-visible ${hiddenCount > 0 ? 'has-mask' : ''}`}
        ref={containerRef}
      >
        {visibleAllergens.map(item => (
          <li key={item} className="item__allergen">
            {item}
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <div>
          <button type="button" className="allergens__toggle-hidden" onClick={onToggle}>
            <span className="icon-wrapper">
              <MemoPlusIcon className="icon" />
            </span>
            <span className="allergens-modal__trigger">{hiddenCount} Mostra tutti</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(AllergensList);
