import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { useCollectionProvider } from '@contexts/CollectionItem/collectionContext';
import { useCallback } from 'react';
export default function LensButton({ Data, title, width = 40, height = 40 }) {
  const { setItemsInReceipt, setTitle } = useCollectionProvider();
  const handleModalOpen = useCallback(() => {
    setItemsInReceipt(Data);
    setTitle(title);
  }, [setItemsInReceipt, Data]);
  return (
    <div>
      <button onClick={handleModalOpen}>
        <ReceiptPercentIcon width={50} height={50} />
      </button>
    </div>
  );
}
