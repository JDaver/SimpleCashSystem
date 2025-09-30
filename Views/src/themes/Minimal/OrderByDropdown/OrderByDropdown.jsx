import React, { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import Dropdown from '@components/Dropdown';
import './OrderByDropdown.css';

const orderByOptions = [
  { label: 'Nome (A-Z)', value: 'A-Z' },
  { label: 'Nome (Z-A)', value: 'Z-A' },
  { label: 'Prezzo crescente', value: 'price-asc' },
  { label: 'Prezzo decrescente', value: 'price-desc' },
];

// placeholders
const partiesOptions = [
  { label: 'Festa 1', value: 'festa1' },
  { label: 'Festa 2', value: 'festa2' },
  { label: 'Festa 3', value: 'festa3' },
  { label: 'Festa 4', value: 'festa4' },
  { label: 'Festa 5', value: 'festa5' },
  { label: 'Festa 6', value: 'festa6' },
];

function OrderByDropdown() {
  const [orderBy, setOrderBy] = useState('');
  return (
    <>
      <p>Ordina per:</p>
      <Dropdown side="left" selected={orderBy} onChange={setOrderBy}>
        <Dropdown.Trigger>
          <FunnelIcon width={30} height={20} />
        </Dropdown.Trigger>
        <Dropdown.Content>
          {orderByOptions.map(option => (
            <Dropdown.Item key={option.value} option={option.value}>
              <span>{option.label}</span>
            </Dropdown.Item>
          ))}
          <Dropdown.Submenu side="left" label="Festa">
            {partiesOptions.map(option => (
              <Dropdown.Item key={option.value}>
                <span>{option.label}</span>
              </Dropdown.Item>
            ))}
          </Dropdown.Submenu>
        </Dropdown.Content>
      </Dropdown>
    </>
  );
}

export default React.memo(OrderByDropdown);
