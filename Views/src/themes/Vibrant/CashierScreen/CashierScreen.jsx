import React, { useCallback, useState } from 'react';
import SingleItem from '../Components/SingleItem';
import { useFetchAll } from '@hooks/productsHook';
import './CashierScreen.css';
import CashierButtons from './CashierButtons';
import InfoButton from '../Components/InfoButton';
import { useMode } from './useMode';

function ModeSwitcher({ mode, switchMode }) {
  return (
    <div className="mode-switcher">
      <label className="mode-switcher__content">
        <input type="checkBox" onChange={switchMode} defaultChecked={mode.label === 'Cucina'} />
        <span className="mode-switcher__slider" />
      </label>
      <p className="mode-switcher__label">{mode.label}</p>
    </div>
  );
}

function CashierScreen() {
  const { products, loading, error } = useFetchAll();
  const { mode, switchMode } = useMode();
  const label = ['Allergeni', 'Articolo', 'prezzo', 'Aggiungi e Rimuovi'];
  const filteredProducts = Array.from(products.values()).filter(
    product => product.isBeverage === mode.params
  );

  const isLoading = loading ? 'Caricamento...' : '';
  const notLoaded = error ? 'Errore!' : '';

  return (
    <div className="cashier-screen">
      <div className="cashier-screen__wrapper">
        <div className="cashier-screen__header">
          <ModeSwitcher mode={mode} switchMode={switchMode} />
        </div>
        <div className="label">
          {' '}
          <SingleItem PlaceHolders={label} />
        </div>
        <ul className="cashier-screen__content">
          {error && notLoaded}
          {loading && isLoading}

          {products &&
            filteredProducts.map(product => {
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
