import redCross from '@assets/redCross.png';
import { useSelectionContext } from '@contexts/ManageItem/SelectionContext';
import { useCallback } from 'react';

export default function CheckButton({ record }) {
  const { selectedIds } = useSelectionContext();
  const { toggleItem } = useSelectionContext();

  const isSelected = selectedIds.includes(record.id);

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
        style={!isSelected ? { filter: 'grayscale(100%)' } : {}}
      />
    </button>
  );
}
