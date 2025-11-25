import { memo, useCallback } from 'react';
import { ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { useCollectionProvider } from '@contexts/CollectionItem/collectionContext';
import { useFetchReceipts } from '@hooks/receiptHook';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { formatDate, formatPrice } from '@utils/helpers';
import DisplayElements from '@themes/Minimal/DisplayElements';
import Item from '@themes/Minimal/Item';
import './ReceiptHistory.css';
import Info from '../Info';

const ReceiptInfo = memo(function ReceiptInfo({ id, date, total }) {
  return (
    <Info>
      <span>{id}</span>
      <span>{formatDate(date)}</span>
      <span>{formatPrice(total.toString().replace('.', ','))}</span>
    </Info>
  );
});

const ReceiptActions = memo(function ReceiptActions({ receipt }) {
  const { setItemsInReceipt, setTitle } = useCollectionProvider();

  const handleModal = useCallback(receipt => {
    setItemsInReceipt(receipt.items);
    setTitle(receipt.id + ' ~ ' + receipt.date);
  }, []);

  return (
    <button className="receipt__summary-btn" onClick={() => handleModal(receipt)}>
      <ReceiptPercentIcon width={30} height={30} />
    </button>
  );
});

function ReceiptsHistory() {
  const { receipts, fetchNext, hasMoreNext } = useFetchReceipts();
  const { bottomLoaderRef } = useInfiniteScroll(fetchNext, hasMoreNext);

  return (
    <DisplayElements labels={['N. Scontrino', 'Data', 'Totale']} actionLabels={['Riepilogo']}>
      {receipts.map(receipt => {
        return (
          <Item
            key={receipt.id}
            renderInfo={() => {
              return <ReceiptInfo id={receipt.id} date={receipt.date} total={receipt.total} />;
            }}
            renderActions={() => {
              return <ReceiptActions receipt={receipt} />;
            }}
          />
        );
      })}
      <div ref={bottomLoaderRef} className="receipt__loader" />
    </DisplayElements>
  );
}

export default memo(ReceiptsHistory);
