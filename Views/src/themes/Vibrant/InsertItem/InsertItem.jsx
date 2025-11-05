import React, { useCallback } from 'react';
import { useInsertItem } from './useInsertItem';
import Keypad from '@themes/Vibrant/Keypad';
import InfoColumn from './InfoColumn';
import './InsertItem.css';
import { useUIContext } from '@contexts/ManageItem/UIContext';
import { useFetchAll } from '@hooks/productsHook';
import { useToast } from '@components/Toast/Toast';
import { useTheme } from '@contexts/Theme';

function InsertItem() {
  const { addToast } = useToast();
  const { theme } = useTheme();
  const { editProduct, insertProduct } = useFetchAll();
  const { handleTableChange } = useUIContext();
  const {
    price,
    name,
    inputPrice,
    singleDeletePrice,
    erasePrice,
    inputName,
    singleDeleteName,
    eraseName,
    updateMode,
    productID,
    setShouldResetForm,
  } = useInsertItem();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log(e.target.name);
      const action = updateMode ? editProduct : insertProduct;
      const message = updateMode
        ? `L'Articolo "${formData.get('product_name')}" è stato modificato correttamente!`
        : `L'Articolo "${formData.get('product_name')}" è stato inserito con successo!`;
      const toastValue = updateMode ? 'ok' : 'success';

      action(formData, {
        onSuccess: () => {
          setShouldResetForm(true);
          if (updateMode) handleTableChange('box1');
          addToast({
            content: () => (
              <div className={`${theme}-toast ${toastValue}`}>
                <span>{message}</span>
              </div>
            ),
            position: 'bottom-left',
            duration: 5000,
          });
        },
        onError: error => {
          addToast({
            content: () => (
              <div className={`${theme}-toast error`}>
                <span>{error.message}</span>
              </div>
            ),
            position: 'bottom-left',
            duration: 5000,
          });
        },
      });
    },
    [updateMode, theme, editProduct, insertProduct, handleTableChange, addToast, setShouldResetForm]
  );

  return (
    <form
      className="form insert-item"
      onSubmit={handleSubmit}
      method={updateMode === true ? 'PUT' : 'POST'}
    >
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
            <Keypad
              preset={'alphabet'}
              onInput={inputName}
              onDelete={singleDeleteName}
              onErase={eraseName}
            />
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
              value={price}
              readOnly
              autoComplete="off"
            />
            <Keypad
              preset={'numeric'}
              onInput={inputPrice}
              onDelete={singleDeletePrice}
              onErase={erasePrice}
            />
          </div>
        </div>
        <div className="form__column">
          <InfoColumn />
        </div>
        {updateMode === true && <input type="hidden" name="id" value={productID.current} />}
      </div>
      <div className="form__button-wrapper">
        {updateMode === false && <button className="form__button">Inserisci Prodotto</button>}
        {updateMode === true && <button className="form__button">Modifica Prodotto</button>}
      </div>
    </form>
  );
}

export default React.memo(InsertItem);
