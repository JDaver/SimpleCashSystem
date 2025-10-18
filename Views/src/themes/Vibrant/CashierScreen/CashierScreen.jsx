import React, { useMemo, useCallback } from 'react';
import { useMode } from './useMode';
import SingleItem from '../Components/SingleItem';
import CashierButtons from './CashierButtons';
import InfoButton from '../Components/InfoButton';
import ModeSwitcher from '../ModeSwitcher';
import './CashierScreen.css';

function CashierScreen({ products }) {
  const { mode, switchMode } = useMode();
  const label = ['Allergeni', 'Articolo', 'prezzo', 'Aggiungi e Rimuovi'];
  const filteredProducts = products.filter(product => product.isBeverage === mode.params);

  // const loading = isLoading ? 'Caricamento...' : '';
  // const notLoaded = error ? 'Errore!' : '';
  return (
    <div className="cashier-screen">
      <div className="cashier-screen__wrapper">
        <div className="cashier-screen__header">
          <ModeSwitcher label={mode.label} action={switchMode} />
        </div>
        <div className="label">
          {' '}
          <SingleItem PlaceHolders={label} />
        </div>
        <ul className="cashier-screen__content">
          {/* {error && notLoaded} */}
          {/* {loading && isLoading} */}

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
