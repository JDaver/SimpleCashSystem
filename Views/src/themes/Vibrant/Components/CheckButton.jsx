import redCross from '@assets/redCross.png';
import { useSelectionContext } from '@contexts/ManageItem/SelectionContext';
import React, { useCallback } from 'react';

function CheckButton({ record }) {
  const { toggleItem, isItemSelected } = useSelectionContext();

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
export default React.memo(CheckButton);
