import React from 'react';
import SingleItem from '../Components/SingleItem';
import { useFetchAll } from '@hooks/productsHook';
import './CashierScreen.css';
import CashierButtons from './CashierButtons';
import InfoButton from '../Components/InfoButton';
import Food from '@assets/Food1.svg?component';
import Drink from '../../../assets/Food2.svg?component';
import FoodandDrink from '@assets/food.png';

function CashierScreen() {
  const { products, loading, error, filters, setFilters } = useFetchAll();
  const label = ['Allergeni', 'Articolo', 'prezzo', 'Aggiungi e Rimuovi'];
  const cashierMode = [
    {
      icon: FoodandDrink,
      label: 'Tutti i prodotti',
      params: { isBeverage: undefined },
    },
    {
      icon: Food,
      label: 'Cucina',
      params: { isBeverage: false },
    },
    {
      icon: Drink,
      label: 'Bar',
      params: { isBeverage: true },
    },
  ];

  const isLoading = loading ? 'Caricamento...' : '';
  const notLoaded = error ? 'Errore!' : '';

  return (
    <div className="cashier-screen">
      <div className="cashier-screen__wrapper">
        <div className="cashier-screen__header">
          {cashierMode.map(mode => (
            <span
              key={mode.label}
              onClick={() => setFilters(mode.params)}
              className={
                filters.isBeverage === mode.params.isBeverage ? 'mode-label-active' : 'mode-label'
              }
            >
              <img src={mode.icon} alt={mode.label} width={42} height={36} />
              {filters.isBeverage === mode.params.isBeverage ? mode.label : ''}
            </span>
          ))}
        </div>
        <div className="label">
          {' '}
          <SingleItem PlaceHolders={label} />
        </div>
        <ul className="cashier-screen__content">
          {error && notLoaded}
          {loading && isLoading}

          {products &&
            Array.from(products.values()).map(product => {
              return (
                <SingleItem
                  key={product.id}
                  mode="cash"
                  Record={product}
                  InfoComponent={InfoButton}
                  ActionButtonsComponent={CashierButtons}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
}
export default React.memo(CashierScreen);
