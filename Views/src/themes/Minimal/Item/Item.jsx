import './Item.css';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

function Item({ name }) {
  return (
    <li className="cashier-screen-item">
      <p className="cashier-screen-item__name">{name}</p>
      <div className="cashier-screen-item__btns-container">
        <button type="button" className="cashier-screen-item__plus-btn">
          <PlusIcon />
        </button>
        <button type="button" className="cashier-screen-item__minus-btn">
          <MinusIcon />
        </button>
      </div>
    </li>
  );
}

export default Item;
