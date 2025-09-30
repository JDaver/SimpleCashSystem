import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const MemoPlusIcon = React.memo(PlusIcon);

function AllergensList({ visibleAllergens, hasHiddenAllergens, hiddenAllergenCount, onToggle }) {
  return (
    <ul className="allergens__list">
      {visibleAllergens.map(item => {
        return (
          <li key={item} className="item__allergen">
            {item}
          </li>
        );
      })}
      {hasHiddenAllergens && (
        <li>
          <button type="button" className="allergens__toggle-hidden" onClick={onToggle}>
            <span className="icon-wrapper">
              <MemoPlusIcon className="icon" />
            </span>
            <span className="allergens-modal__trigger">Mostra altri {hiddenAllergenCount}</span>
          </button>
        </li>
      )}
    </ul>
  );
}

export default React.memo(AllergensList);
