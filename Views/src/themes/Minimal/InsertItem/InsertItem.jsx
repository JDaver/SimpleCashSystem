import React, { useCallback } from 'react';
import { useInsertItem } from './useInsertItem';
import Checkbox from '@components/Checkbox';
import AllergensDropdown from '@themes/Minimal/AllergensDropdown';
import PartiesDropdown from '../PartiesDropdown';
import InputWithKeypad from './InputWithKeypad';
import './InsertItem.css';

function InsertItem() {
  const {
    name,
    price,
    allergens,
    isBeverage,
    isGlobal,
    partiesRelated,
    selectedItem,
    setAllergens,
    setIsBeverage,
    setIsGlobal,
    setPartiesRelated,
    handleNameInput,
    handleNameDelete,
    handlePriceInput,
    handlePriceDelete,
    handleSubmit,
  } = useInsertItem();

  const handleBeverageChange = useCallback(e => {
    setIsBeverage(e.target.checked);
  }, []);

  const handleGlobalChange = useCallback(e => {
    setIsGlobal(e.target.checked);
  }, []);

  const buttonDisabled = !name || !price || (!isGlobal && partiesRelated.length < 1);

  return (
    <form className="form insert-item" onSubmit={handleSubmit}>
      <div className="form__columns">
        <InputWithKeypad
          id="name"
          label="Nome"
          value={name}
          preset="alphabet"
          onInput={handleNameInput}
          onDelete={handleNameDelete}
        />
        <InputWithKeypad
          id="price"
          label="Prezzo"
          value={price}
          preset="numeric"
          inputMode="decimal"
          pattern="[0-9]*"
          onInput={handlePriceInput}
          onDelete={handlePriceDelete}
        />
        <div className="form__column">
          <AllergensDropdown allergens={allergens} setAllergens={setAllergens} />
          <Checkbox
            id="beverage"
            label="Bevanda"
            checked={isBeverage}
            onChange={handleBeverageChange}
          />
          <Checkbox
            id="global"
            label="Disponibile in tutte le feste"
            checked={isGlobal}
            onChange={handleGlobalChange}
          />
          <PartiesDropdown
            disabled={isGlobal}
            parties={partiesRelated}
            setParties={setPartiesRelated}
          />
        </div>
      </div>
      <div className="form__button-wrapper">
        <button type="submit" className="form__button" disabled={buttonDisabled}>
          {selectedItem ? 'Modifica Prodotto' : 'Inserisci Prodotto'}
        </button>
      </div>
    </form>
  );
}

export default React.memo(InsertItem);
