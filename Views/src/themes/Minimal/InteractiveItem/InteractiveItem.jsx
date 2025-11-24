import { useSelectionContext } from '@contexts/ManageItem/SelectionContext';
import { useInteractiveItemLogic } from './useInteractiveItemLogic';
import ProductItem from '../ProductItem/ProductItem';
import '../ProductItem/ProductItem.css';
import { useCallback, useMemo } from 'react';

function InteractiveItem({ id, name, price, allergens, renderActions }) {
  const { isItemSelected, selectionMode } = useSelectionContext();
  const {
    swipeProgress,
    isSwiping,
    setPendingDelete,
    handleClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useInteractiveItemLogic(id, selectionMode);

  const handleDelete = useCallback(() => setPendingDelete({ items: [id] }), [setPendingDelete, id]);

  const showActions = !selectionMode;
  const isSelected = useMemo(() => isItemSelected(id), [id, isItemSelected]);
  const swipeStyles = useMemo(() => ({ '--swipe-progress': swipeProgress }), [swipeProgress]);

  return (
    <ProductItem
      name={name}
      price={price}
      allergens={allergens}
      showAllergens={!selectionMode}
      className={`${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      renderActions={() => {
        return renderActions?.({ showActions, handleDelete } ?? {});
      }}
    >
      <div className={`item__swipe-progress ${isSwiping ? 'visible' : ''}`} style={swipeStyles} />
    </ProductItem>
  );
}

export default InteractiveItem;
