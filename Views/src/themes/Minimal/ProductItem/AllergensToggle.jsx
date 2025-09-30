import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const MemoPlusIcon = React.memo(PlusIcon);
const MemoMinusIcon = React.memo(MinusIcon);

function AllergensToggle({ showAllergens, onToggle }) {
  return (
    <button className="allergens__toggle" onClick={onToggle}>
      Allergeni
      <span className="icon-wrapper">
        {showAllergens ? <MemoMinusIcon className="icon" /> : <MemoPlusIcon className="icon" />}
      </span>
    </button>
  );
}

export default React.memo(AllergensToggle);
