import { useFetchItems } from '@hooks/productsHook';
import DisplayElements from '../DisplayElements/DisplayElements';
import Item from '../Item/Item';

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
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 250px)', gap: '6rem' }}
                >
                  <span>{product.name}</span>
                  <span>{product.quantity}</span>
                  <span>{product.inHowManyReceipts}</span>
                </div>
              );
            }}
          />
        );
      })}
    </DisplayElements>
  );
}

export default SalesHistory;
