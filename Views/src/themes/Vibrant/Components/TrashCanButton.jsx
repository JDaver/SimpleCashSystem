import React, { useCallback } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useUIContext } from '../../../contexts/ManageItem/UIContext';

function CheckButton({ product }) {
  const { setPendingDelete } = useUIContext();
  const { id } = product;
  const handleDelete = useCallback(() => setPendingDelete({ items: [id] }), [setPendingDelete, id]);
  return (
    <button onClick={handleDelete}>
      <TrashIcon height={50} width={60} />
    </button>
  );
}
export default React.memo(CheckButton);
