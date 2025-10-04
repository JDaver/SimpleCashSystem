import Keypad from '@themes/Vibrant/Keypad';
import InfoColumn from './InfoColumn';
import { insertItem, modifyItem } from '@utils/productService';
import { useInsertItem } from './useInsertItem';
import './InsertItem.css';
import { useCallback } from 'react';
import { useProductsContext } from '@contexts/ManageItem/ProductsContext';
import { useUIContext } from '../../../contexts/ManageItem/UIContext';

function InsertItem() {
  const { editProduct, insertProduct } = useProductsContext();
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
  } = useInsertItem();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      if (updateMode === true) {
        editProduct(formData, {
          onSuccess: () => handleTableChange('box1'),
        });
      } else {
        insertProduct(formData);
      }
    },
    [updateMode, editProduct, insertProduct, handleTableChange]
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
              type="number"
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
        {updateMode === true && <input type="hidden" name="id" value={productID} />}
      </div>
      <div className="form__button-wrapper">
        {updateMode === false && <button className="form__button">Inserisci Prodotto</button>}
        {updateMode === true && <button className="form__button">Modifica Prodotto</button>}
      </div>
    </form>
  );
}

export default InsertItem;
