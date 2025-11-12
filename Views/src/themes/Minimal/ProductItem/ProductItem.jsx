import React, { useCallback, useMemo, useState } from 'react';
import { useSelectionContext } from '@contexts/ManageItem/SelectionContext';
import { useProductItemLogic } from './useProductItemLogic';
import Item from '@themes/Minimal/Item';
import AllergensToggle from './AllergensToggle';
import AllergensList from './AllergensList';
import AllergensModal from './AllergensModal';
import './ProductItem.css';

function ProductItem({ id, name, price, allergens, isInteractive, renderActions }) {
  const selectionContext = useSelectionContext();
  const isItemSelected = isInteractive ? selectionContext.isItemSelected : () => false;
  const selectionMode = isInteractive ? selectionContext.selectionMode : false;
  const {
    swipeProgress,
    isSwiping,
    setPendingDelete,
    handleClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useProductItemLogic(id, isInteractive, selectionMode);

  const [showAllergens, setShowAllergens] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const normalizedAllergens = useMemo(() => {
    if (Array.isArray(allergens)) return allergens;
    if (typeof allergens === 'string') return allergens ? [allergens] : [];
    return [];
  }, [allergens]);

  const toggleAllergens = useCallback(() => {
    setShowAllergens(prev => !prev);
  }, []);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const handleDelete = useCallback(() => setPendingDelete({ items: [id] }), [setPendingDelete, id]);

  const showAllergensToggle = !selectionMode && normalizedAllergens.length > 0;
  const showActions = !selectionMode && isInteractive;
  const isSelected = useMemo(() => isItemSelected(id), [id, isItemSelected]);
  const swipeStyles = useMemo(() => ({ '--swipe-progress': swipeProgress }), [swipeProgress]);

  return (
    <Item
      className={`${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      renderInfo={() => {
        return (
          <div className="product-item__info">
            <span>{name}</span>
            <span>{price}</span>
            <div className="allergens__wrapper">
              {showAllergensToggle && (
                <AllergensToggle showAllergens={showAllergens} onToggle={toggleAllergens} />
              )}
              {showAllergens && !selectionMode && (
                <AllergensList allergens={normalizedAllergens} onToggle={toggleModal} />
              )}
            </div>
            {showModal && (
              <AllergensModal
                name={name}
                allergens={normalizedAllergens}
                showModal={showModal}
                onClose={toggleModal}
              />
            )}
          </div>
        );
      }}
      renderActions={() => {
        return renderActions?.({ showActions, handleDelete });
      }}
    >
      {isInteractive && (
        <div className={`item__swipe-progress ${isSwiping ? 'visible' : ''}`} style={swipeStyles} />
      )}
    </Item>
  );
}

export default React.memo(ProductItem);
