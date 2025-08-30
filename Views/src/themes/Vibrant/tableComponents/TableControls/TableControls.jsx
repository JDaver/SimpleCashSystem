import { CheckIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Dropdown from '@components/Dropdown';
import './TableControls.css';
import { useState } from 'react';

const yearsArr = ['2020', '2021', '2022', '2023', '2024', '2025'];

const orderByArr = ['Nome', 'Prezzo', 'Più venduto'];

function TableControls() {
  const [years, setYears] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  return (
    <div className="table__controls">
      <div className="table__controls-inner">
        <div className="table__controls-inner-wrapper">
          <p>Anno:</p>
          <Dropdown side={'left'} selected={years} onChange={setYears} multiple>
            <Dropdown.Trigger>
              <FunnelIcon width={30} height={20} />
            </Dropdown.Trigger>
            <Dropdown.Content>
              {yearsArr.map(year => (
                <Dropdown.Item key={year} option={year}>
                  <span className="check-icon-wrapper">
                    {years.includes(year) && <CheckIcon width={30} height={20} />}
                  </span>
                  <span>{year}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
        <div className="table__controls-inner-wrapper">
          <p>Ordina per:</p>
          <Dropdown side={'right'} selected={orderBy} onChange={setOrderBy}>
            <Dropdown.Trigger>
              <FunnelIcon width={30} height={20} />
            </Dropdown.Trigger>
            <Dropdown.Content>
              {orderByArr.map(orderBy => (
                <Dropdown.Item key={orderBy} option={orderBy}>
                  <span>{orderBy}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default TableControls;
