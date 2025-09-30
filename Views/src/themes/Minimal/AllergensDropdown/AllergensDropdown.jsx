import Dropdown from '@components/Dropdown';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react';

const allergensArr = [
  'Cereali contenenti glutine',
  'Crostacei',
  'Uova',
  'Pesce',
  'Arachidi',
  'Soia',
  'Latte',
  'Frutta a guscio',
  'Sedano',
  'Semi di sesamo',
  'Senape',
  'Anidride solforosa e solfiti',
  'Lupini',
  'Molluschi',
];

const MemoChevronRight = React.memo(ChevronRightIcon);

function AllergensDropdown({ allergens, setAllergens }) {
  return (
    <Dropdown side={'left'} selected={allergens} onChange={setAllergens} multiple>
      <Dropdown.Trigger aria-label="Seleziona allergeni">
        <p>Allergeni</p>
        <MemoChevronRight className="rotate" width={20} height={15} />
      </Dropdown.Trigger>
      <Dropdown.Content>
        {allergensArr.map(allergen => {
          return (
            <Dropdown.Item key={allergen} option={allergen}>
              <span className="check-icon-wrapper">
                {allergens.includes(allergen) && <CheckIcon width={30} height={20} />}
              </span>
              <span>{allergen}</span>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown>
  );
}

export default React.memo(AllergensDropdown);
