import { useFetchAll } from '@hooks/productsHook';
import { useSwipe } from '@hooks/useSwipe';
import './DisplayElements.css';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useLongPress } from '@hooks/useLongPress';
import { ChevronLeftIcon, ExclamationCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import Modal from '@components/Modal';
import { useSelectedItemsReducer } from '@hooks/useSelectedItemsReducer';

function DisplayElements({ swipeLeft }) {
  const { products: fetchedProducts } = useFetchAll();
  const { selectedItems, selectAll, toggleItem, clearSelection } = useSelectedItemsReducer();
  const [deletedItemIds, setDeletedItemIds] = useState([]);
  const [pendingDelete, setPendingDelete] = useState({ items: [] });
  const [swipingItem, setSwipingItem] = useState({ id: null, deltaX: 0 });
  const productRef = useRef(null);
  const selectionMode = selectedItems.length > 0;
  const isModalOpen = pendingDelete.items.length > 0;

  const products = useMemo(() => {
    return fetchedProducts.filter(product => !deletedItemIds.includes(product.id));
  }, [fetchedProducts, deletedItemIds]);

  const isItemBeingSwiped = useCallback(
    product => swipingItem.id === product.id && Math.abs(swipingItem.deltaX) > 5,
    [swipingItem]
  );

  const isGestureIgnored = e => e.target.closest('[data-ignore-gesture]');

  const deleteItem = useCallback(itemsToDelete => {
    const idsToDelete = (Array.isArray(itemsToDelete) ? itemsToDelete : [itemsToDelete]).map(
      item => item.id
    );

    setDeletedItemIds(prev => [...prev, ...idsToDelete]);
    clearSelection();
    setPendingDelete({ items: [] });
  }, []);

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (productRef.current) {
        swipeLeft(productRef.current);
      }
    },
    onSwipeProgress: ({ deltaX }) => {
      if (productRef.current) {
        setSwipingItem({ id: productRef.current.id, deltaX });
      }
    },
    threshold: 30,
  });

  const longPressHandlers = useLongPress(() => {
    const current = productRef.current;
    if (!current || isItemBeingSwiped(current)) return;
    toggleItem(current);
  });

  const handleSelectAll = useCallback(() => {
    selectAll(products);
  }, [selectAll, products]);

  const handleClear = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  const handleDeleteConfirmed = useCallback(() => {
    deleteItem(pendingDelete.items);
  }, [deleteItem, pendingDelete]);

  const handleClick = useCallback(
    product => {
      if (isItemBeingSwiped(product)) return;

      productRef.current = product;
      toggleItem(product);
    },
    [selectionMode, toggleItem, isItemBeingSwiped]
  );

  const handleTouchStart = useCallback(
    (e, product) => {
      if (selectionMode || isGestureIgnored(e)) return;
      productRef.current = product;

      swipeHandlers.onTouchStart(e);
      longPressHandlers.onTouchStart(e);

      setSwipingItem({ id: product.id, deltaX: 0 });
    },
    [selectionMode, swipeHandlers, longPressHandlers]
  );

  const handleTouchMove = useCallback(
    e => {
      if (selectionMode || isGestureIgnored(e)) return;

      swipeHandlers.onTouchMove(e);
      longPressHandlers.cancel?.();
    },
    [selectionMode, swipeHandlers, longPressHandlers]
  );

  const handleTouchEnd = useCallback(
    e => {
      if (selectionMode || isGestureIgnored(e)) return;

      swipeHandlers.onTouchEnd(e);
      longPressHandlers.onTouchEnd(e);
      setSwipingItem({ id: null, deltaX: 0 });
    },
    [selectionMode, swipeHandlers, longPressHandlers]
  );

  return (
    <div className="display-elements">
      <div className="display-elements__wrapper">
        <div className="toolbar">
          {selectedItems.length > 0 && (
            <>
              <div className="toolbar__section">
                <span className="toolbar__label">Selezionati ({selectedItems.length})</span>
                {selectedItems.length < products.length && (
                  <button className="toolbar__button" type="button" onClick={handleSelectAll}>
                    Seleziona tutti ({products.length})
                  </button>
                )}
                {selectedItems.length > 1 && (
                  <button className="toolbar__button" type="button" onClick={handleClear}>
                    Deseleziona tutti
                  </button>
                )}
              </div>
              <button
                disabled={selectedItems.length <= 1}
                className="toolbar__button trigger"
                onClick={() => {
                  setPendingDelete({ items: selectedItems });
                }}
              >
                Elimina selezionati
              </button>
            </>
          )}
          <Modal isOpen={isModalOpen} onClose={() => setPendingDelete({ items: [] })}>
            <Modal.Portal>
              <Modal.Overlay />
              <Modal.Content>
                <Modal.Description>
                  {pendingDelete.items.length > 1
                    ? 'Sei sicuro di voler eliminare gli elementi selezionati?'
                    : `Sei sicuro di voler eliminare ${pendingDelete.items[0]?.name}?`}
                </Modal.Description>
                <Modal.Footer>
                  <button onClick={handleDeleteConfirmed}>Elimina</button>
                  <Modal.Close>
                    <button>Annulla</button>
                  </Modal.Close>
                </Modal.Footer>
              </Modal.Content>
            </Modal.Portal>
          </Modal>
        </div>
        <div className="display-elements__labels">
          <span>Allergeni</span>
          <span>Nome</span>
          <span>Prezzo</span>
        </div>
        <div className="display-elements__list">
          {products.map(product => {
            const selected = selectedItems.some(i => i.id === product.id);
            const isSwiping = swipingItem.id === product.id;
            const swipeAmount = Math.min(Math.abs(swipingItem.deltaX), 100);
            const swipeProgress = swipeAmount / 100;
            return (
              <div
                key={product.id}
                className={`item ${selected ? 'selected' : ''}`}
                onClick={() => handleClick(product)}
                onTouchStart={e => handleTouchStart(e, product)}
                onTouchMove={e => handleTouchMove(e)}
                onTouchEnd={e => handleTouchEnd(e)}
              >
                {isSwiping && (
                  <div
                    className="item__swipe-progress"
                    style={{
                      width: `${swipeProgress * 100}%`,
                      opacity: swipeProgress,
                    }}
                  />
                )}
                <div className="item__info">
                  <span className="icon-wrapper">
                    <ExclamationCircleIcon className="icon" />
                  </span>
                  <span>{product.name}</span>
                  <span>{product.price}</span>
                </div>
                <div className="item__actions">
                  {!selectionMode && (
                    <>
                      <span className="swipe-hint">
                        <ChevronLeftIcon width={20} height={10} />
                        Scorri per modificare
                      </span>
                      <button
                        data-ignore-gesture
                        type="button"
                        onClick={() => {
                          setPendingDelete({ items: [product] });
                        }}
                      >
                        <TrashIcon width={30} height={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DisplayElements;
