import Keypad from '@themes/Vibrant/Keypad';
import InfoColumn from './InfoColumn';
import { insertItem } from '@utils/productService';
import { useInsertItem } from './useInsertItem';
import './InsertItem.css';

function InsertItem() {
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
  } = useInsertItem();

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
      </div>
      <div className="form__button-wrapper">
        {updateMode === false && <button className="form__button">Inserisci Prodotto</button>}
        {updateMode === true && <button className="form__button">Modifica Prodotto</button>}
      </div>
    </form>
  );
}

export default InsertItem;
