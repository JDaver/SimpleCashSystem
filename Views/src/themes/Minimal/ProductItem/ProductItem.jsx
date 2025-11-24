import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { lazyWithLoadOptions } from '@utils/helpers';
import Item from '@themes/Minimal/Item';
import Info from '@themes/Minimal/Info';
import AllergensList from './AllergensList';
import './ProductItem.css';

const AllergensModal = lazyWithLoadOptions(() => import('./AllergensModal'), {
  preload: false,
  prefetch: true,
});

function ProductItem({
  name,
  price,
  allergens,
  showAllergens = true,
  renderActions,
  children,
  ...props
}) {
  const [showModal, setShowModal] = useState(false);

  const normalizedAllergens = useMemo(() => {
    if (Array.isArray(allergens)) return allergens;
    if (typeof allergens === 'string') return allergens ? [allergens] : [];
    return [];
  }, [allergens]);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  return (
    <Item
      renderInfo={() => {
        return (
          <Info gridColumns="300px 150px 300px">
            <span>{name}</span>
            <span>{price}</span>
            <div className="allergens__wrapper">
              {showAllergens && (
                <AllergensList
                  allergens={normalizedAllergens}
                  onToggle={toggleModal}
                  prefetchModal={AllergensModal.prefetch}
                />
              )}
            </div>
            {showModal && (
              <Suspense fallback="Loading modal...">
                <AllergensModal
                  name={name}
                  allergens={normalizedAllergens}
                  showModal={showModal}
                  onClose={toggleModal}
                />
              </Suspense>
            )}
          </Info>
        );
      }}
      renderActions={() => {
        return renderActions?.();
      }}
      {...props}
    >
      {children}
    </Item>
  );
}

export default React.memo(ProductItem);
