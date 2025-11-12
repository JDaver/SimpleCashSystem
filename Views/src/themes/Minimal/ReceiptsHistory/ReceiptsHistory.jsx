import { memo, useCallback } from 'react';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { useCollectionProvider } from '@contexts/CollectionItem/collectionContext';
import { useFetchReceipts } from '@hooks/receiptHook';
import { formatDate, formatPrice } from '@utils/helpers';
import DisplayElements from '@themes/Minimal/DisplayElements';
import Item from '@themes/Minimal/Item';

function ReceiptsHistory() {
  const { receipts } = useFetchReceipts();
  const { setItemsInReceipt, setTitle } = useCollectionProvider();

  const handleModal = useCallback(receipt => {
    setItemsInReceipt(receipt.items);
    setTitle(receipt.id + ' ~ ' + receipt.date);
  }, []);

  return (
    <DisplayElements labels={['N. Scontrino', 'Data', 'Totale']} actionLabels={['Riepilogo']}>
      {receipts.map(receipt => {
        return (
          <Item
            key={receipt.id}
            renderInfo={() => {
              return (
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 250px)', gap: '6rem' }}
                >
                  <span>{receipt.id}</span>
                  <span>{formatDate(receipt.date)}</span>
                  <span>{formatPrice(receipt.total.toString().replace('.', ','))}</span>
                </div>
              );
            }}
            renderActions={() => {
              return (
                <button style={{ marginRight: '1.5rem' }} onClick={() => handleModal(receipt)}>
                  <ReceiptPercentIcon width={30} height={30} />
                </button>
              );
            }}
          />
        );
      })}
    </DisplayElements>
  );
}

export default memo(ReceiptsHistory);
