import React, { useState, useMemo } from 'react';
import DisplayElements from '../DisplayElements/DisplayElements';
import './CashierScreen.css';

const tables = [
  { id: 'box1', title: 'Cucina', topic: 'cashFood' },
  { id: 'box2', title: 'Bar', topic: 'cashBeverage' },
];

function TableSelector({ selected, onSelect }) {
  return (
    <div className="selector-wrapper">
      {tables.map(t => (
        <div
          key={t.id}
          className={`topic-btn ${selected === t.id ? 'active' : ''}`}
          onClick={() => onSelect(t.id)}
        >
          {t.title}
        </div>
      ))}
    </div>
  );
}

function CashierScreen() {
  const [selected, setSelected] = useState('box1');
  const selectedTable = useMemo(() => tables.find(t => t.id === selected), [selected]);

  console.log(selectedTable.topic);

  return (
    <div className="cashier-screen">
      <div className="cashier-screen__wrapper">
        <div className="cashier-screen__header">
          <TableSelector selected={selected} onSelect={setSelected} />
        </div>
        <DisplayElements topic={selectedTable.topic} />
      </div>
    </div>
  );
}

export default React.memo(CashierScreen);
