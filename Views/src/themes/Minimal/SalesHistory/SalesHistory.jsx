import { memo } from 'react';
import { useFetchItems } from '@hooks/productsHook';
import DisplayElements from '@themes/Minimal/DisplayElements';
import Item from '@themes/Minimal/Item';
import Info from '../Info';

const SalesInfo = memo(function SalesInfo({ name, quantity, inHowManyReceipts }) {
  return (
    <Info>
      <span>{name}</span>
      <span>{quantity}</span>
      <span>{inHowManyReceipts}</span>
    </Info>
  );
});

function SalesHistory() {
  const { records: products } = useFetchItems();
  return (
    <DisplayElements labels={['Nome', 'Venduti', 'Compare in']}>
      {products.map(product => {
        return (
          <Item
            key={product.id}
            renderInfo={() => {
              return (
                <SalesInfo
                  name={product.name}
                  quantity={product.quantity}
                  inHowManyReceipts={product.inHowManyReceipts}
                />
              );
            }}
          />
        );
      })}
    </DisplayElements>
  );
}

export default memo(SalesHistory);
