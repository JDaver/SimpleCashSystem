import React from 'react';
import { useProductsContext } from '@contexts/ManageItem';
import ProductItem from '../ProductItem';
import './DisplayElements.css';

function DisplayElements({ isInteractive = false }) {
  const { products } = useProductsContext();
  console.log(products);

  return (
    <div className="display-elements">
      <div className="display-elements__wrapper">
        <div className="display-elements__labels">
          <span>Nome</span>
          <span>Prezzo</span>
        </div>
        <div className="display-elements__list">
          {Array.from(products.values()).map(({ id, name, price, allergens }) => {
            return (
              <ProductItem
                key={id}
                id={id}
                name={name}
                price={price}
                allergens={allergens}
                isInteractive={isInteractive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default React.memo(DisplayElements);
