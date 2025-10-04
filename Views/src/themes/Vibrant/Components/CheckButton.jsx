import redCross from '@assets/redCross.png';
import { useSelectionContext } from '@contexts/ManageItem/SelectionContext';
import { useCallback } from 'react';

export default function CheckButton({ record }) {
  const { selectedIds, toggleItem, isItemSelected } = useSelectionContext();

  const selectItem = useCallback(
    product => {
      toggleItem(product.id);
    },
    [toggleItem]
  );

  return (
    <button onClick={() => selectItem(record)}>
      <img
        src={redCross}
        className="red-cross"
        style={!isItemSelected(record.id) ? { filter: 'grayscale(100%)' } : {}}
      />
    </button>
  );
}
