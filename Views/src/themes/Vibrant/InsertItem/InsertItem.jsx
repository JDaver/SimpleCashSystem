import { useState } from 'react';
import Keypad from '@themes/Vibrant/Keypad';
import Dropdown from '@components/Dropdown';
import { insertItem } from '@utils/productService';
import './InsertItem.css';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const allergensArr = [
  'Cereali contenenti glutine',
  'Crostacei',
  'Uova',
  'Pesce',
  'Arachidi',
  'Soia',
  'Latte',
  'Frutta a guscio',
  'Sedano',
  'Semi di sesamo',
  'Senape',
  'Anidride solforosa e solfiti',
  'Lupini',
  'Molluschi',
];

function InsertItem() {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [allergens, setAllergens] = useState([]);

  const handlePriceInput = key => {
    if (key === ',' && price.includes(',')) return;
    setPrice(prev => prev + key);
  };

  const handlePriceDelete = () => {
    setPrice(prev => prev.slice(0, -1));
  };

  const handleNameInput = key => {
    setName(prev => prev + key);
  };

  const handleNameDelete = () => {
    setName(prev => prev.slice(0, -1));
  };

  return (
    <form className="form insert-item" onSubmit={insertItem} method='POST' >
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
              type="number"
              value={price}
              readOnly
              autoComplete="off"
            />
            <Keypad preset={'numeric'} onInput={handlePriceInput} onDelete={handlePriceDelete} />
          </div>
        </div>
        <div className="form__column">
          <div className="form__field">
            <Dropdown side={'left'} selected={allergens} onChange={setAllergens} multiple>
              <Dropdown.Trigger aria-label="Seleziona allergeni">
                <p>Allergeni</p>
                <ChevronRightIcon className="rotate" width={20} height={15} />
              </Dropdown.Trigger>
              <Dropdown.Content>
                {allergensArr.map(allergen => {
                  return (
                    <Dropdown.Item key={allergen} option={allergen}>
                      <span className="check-icon-wrapper">
                        {allergens.includes(allergen) && <CheckIcon width={30} height={20} />}
                      </span>
                      <span>{allergen}</span>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Content>
            </Dropdown>
            {allergens.map((allergen) => {
              return <input key={allergen} type="hidden" name="allergens" value={allergen} />
            })}
            
          </div>
        </div>
      </div>
      <div className="form__button-wrapper">
        <button className="form__button" >Inserisci Prodotto</button>
      </div>
    </form>
  );
}

export default InsertItem;
