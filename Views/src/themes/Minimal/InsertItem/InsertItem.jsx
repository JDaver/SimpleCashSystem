import React, { useCallback, useEffect, useState } from 'react';
import Keypad from '@themes/Minimal/Keypad';
import { insertItem } from '../../../utils/productService';
import './InsertItem.css';
import { useEditingContext } from '@contexts/ManageItem';
import AllergensDropdown from '@themes/Minimal/AllergensDropdown';

function InsertItem() {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [allergens, setAllergens] = useState([]);
  const { selectedItem, shouldResetForm } = useEditingContext();

  useEffect(() => {
    if (shouldResetForm) {
      setName('');
      setPrice('');
      setAllergens([]);
    } else if (selectedItem) {
      setName(selectedItem.name || '');
      setPrice(selectedItem.price?.toString() || '');
      setAllergens(selectedItem.allergens || []);
    }
  }, [shouldResetForm, selectedItem]);

  const handleNameInput = useCallback(key => {
    setName(prev => prev + key);
  }, []);

  const handleNameDelete = useCallback(() => {
    setName(prev => prev.slice(0, -1));
  }, []);

  const handlePriceInput = useCallback(
    key => {
      if (key === ',' && price.includes(',')) return;
      setPrice(prev => prev + key);
    },
    [price]
  );

  const handlePriceDelete = useCallback(() => {
    setPrice(prev => prev.slice(0, -1));
  }, []);

  return (
    <form className="form insert-item" onSubmit={insertItem} method="POST">
      <div className="form__columns">
        <div className="form__column">
          <div className="form__field">
            <label className="form__label" htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              name="product_name"
              className="form__input"
              type="text"
              value={name}
              readOnly
              autoComplete="off"
            />
            <Keypad preset={'alphabet'} onInput={handleNameInput} onDelete={handleNameDelete} />
          </div>
        </div>
        <div className="form__column">
          <div className="form__field">
            <label className="form__label" htmlFor="price">
              Prezzo
            </label>
            <input
              id="price"
              name="price"
              className="form__input"
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              value={price}
              readOnly
              autoComplete="off"
            />
            <Keypad preset={'numeric'} onInput={handlePriceInput} onDelete={handlePriceDelete} />
          </div>
        </div>
        <div className="form__column">
          <div className="form__field">
            <AllergensDropdown allergens={allergens} setAllergens={setAllergens} />
          </div>
        </div>
      </div>
      <div className="form__button-wrapper">
        <button className="form__button" disabled={!name || !price}>
          {`${selectedItem ? 'Modifica' : 'Inserisci'} Prodotto`}
        </button>
      </div>
    </form>
  );
}

export default React.memo(InsertItem);
