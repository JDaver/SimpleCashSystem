import './Item.css';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

function Item({ name }) {
  return (
    <div className="item">
      <p className="item__name">{name}</p>
      <div className="item__btns-container">
        <button type="button" className="item__plus-btn">
          <PlusIcon />
        </button>
        <button type="button" className="item__minus-btn">
          <MinusIcon />
        </button>
      </div>
    </div>
  );
}

export default Item;
