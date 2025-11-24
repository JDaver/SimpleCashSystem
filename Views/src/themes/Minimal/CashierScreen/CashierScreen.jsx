import { useMemo, useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useReceipt } from '@contexts/receiptHandlerContext';
import { useFetchCashier } from '@hooks/productsHook';
import DisplayElements from '@themes/Minimal/DisplayElements';
import ProductItem from '@themes/Minimal/ProductItem';
import { formatPrice } from '@utils/helpers';
import './CashierScreen.css';

const TABS = {
  food: {
    label: 'Cibo',
    filter: p => !p.isBeverage,
  },
  drink: {
    label: 'Bevande',
    filter: p => p.isBeverage,
  },
};

function CashierScreen() {
  const { products } = useFetchCashier();
  const { addToReceipt, decrementQuantityInReceipt } = useReceipt();
  const [activeTab, setActiveTab] = useState('food');

  const filteredProducts = useMemo(() => {
    return products.filter(TABS[activeTab].filter);
  }, [products, activeTab]);

  return (
    <div className="cashier-screen__container">
      <div className="cashier-screen__body">
        <div className="cashier-screen__tabs">
          {Object.entries(TABS).map(([key, { label }]) => (
            <button
              key={key}
              className={`cashier-screen__tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <DisplayElements
          height="525px"
          infoGridColumns="300px 150px 1fr"
          borderRadius="0"
          headerBgColor="var(--neutral-300)"
          headerTextColor="var(--neutral-800)"
          labels={['Nome', 'Prezzo', 'Allergeni']}
        >
          {filteredProducts.map(product => {
            return (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={formatPrice(product.price.toString().replace('.', ','))}
                allergens={product.allergens}
                renderActions={() => {
                  return (
                    <div className="cashier-screen-item__btns-container">
                      <button
                        type="button"
                        className="cashier-screen-item__plus-btn"
                        onClick={() => addToReceipt(product)}
                      >
                        <PlusIcon />
                      </button>
                      <button
                        type="button"
                        className="cashier-screen-item__minus-btn"
                        onClick={() => decrementQuantityInReceipt(product.id)}
                      >
                        <MinusIcon />
                      </button>
                    </div>
                  );
                }}
              />
            );
          })}
        </DisplayElements>
      </div>
    </div>
  );
}

export default CashierScreen;
