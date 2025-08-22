import { FunnelIcon } from '@heroicons/react/24/outline';
import Dropdown from '@components/Dropdown';
import './TableControls.css';

function TableControls() {
  return (
    <div className="table__controls">
      <div className="table__controls-inner">
        <div className="table__controls-inner-wrapper">
          <p>Anno:</p>
          <Dropdown side={'left'} icon={<FunnelIcon width={30} height={20} />} />
        </div>
        <div className="table__controls-inner-wrapper">
          <p>Ordina per:</p>
          <Dropdown side={'right'} icon={<FunnelIcon width={30} height={20} />} />
        </div>
      </div>
    </div>
  );
}

export default TableControls;
