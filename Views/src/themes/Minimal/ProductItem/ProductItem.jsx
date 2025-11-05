import React, { useCallback, useMemo, useState } from 'react';
import { useSelectionContext } from '@contexts/ManageItem/SelectionContext';
import { useProductItemLogic } from './useProductItemLogic';
import AllergensToggle from './AllergensToggle';
import AllergensList from './AllergensList';
import AllergensModal from './AllergensModal';
import './ProductItem.css';

const MAX_VISIBLE_ALLERGENS = 3;

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

  const visibleAllergens = useMemo(
    () => normalizedAllergens.slice(0, MAX_VISIBLE_ALLERGENS),
    [normalizedAllergens]
  );

  const { hasAllergens, hiddenAllergenCount, hasHiddenAllergens } = useMemo(() => {
    const len = normalizedAllergens.length;
    const hiddenCount = Math.max(len - MAX_VISIBLE_ALLERGENS, 0);
    return {
      hasAllergens: len > 0,
      hiddenAllergenCount: hiddenCount,
      hasHiddenAllergens: hiddenCount > 0,
    };
  }, [normalizedAllergens]);

  const showAllergensToggle = !selectionMode && hasAllergens;

  const isSelected = useMemo(() => isItemSelected(id), [id, isItemSelected]);
  const swipeStyles = useMemo(() => ({ '--swipe-progress': swipeProgress }), [swipeProgress]);

  const toggleAllergens = useCallback(() => {
    setShowAllergens(prev => !prev);
  }, []);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  const handleDelete = useCallback(() => setPendingDelete({ items: [id] }), [setPendingDelete, id]);

  return (
    <div
      className={`item ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {isInteractive && (
        <div className={`item__swipe-progress ${isSwiping ? 'visible' : ''}`} style={swipeStyles} />
      )}
      <div className="item__info">
        <span>{name}</span>
        <span>{price}</span>
        {showAllergensToggle && (
          <AllergensToggle showAllergens={showAllergens} onToggle={toggleAllergens} />
        )}
        {showAllergens && (
          <AllergensList
            visibleAllergens={visibleAllergens}
            hiddenAllergenCount={hiddenAllergenCount}
            hasHiddenAllergens={hasHiddenAllergens}
            onToggle={toggleModal}
          />
        )}
        {showModal && (
          <AllergensModal
            allergens={normalizedAllergens}
            showModal={showModal}
            onClose={toggleModal}
          />
        )}
      </div>
      <div className="item__actions">{renderActions?.({ handleDelete })}</div>
    </div>
  );
}

export default React.memo(ProductItem);
