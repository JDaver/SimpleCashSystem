import { useSwipe } from '@hooks/useSwipe';
import { useManageItemState, useManageItemActions } from '@contexts/ManageItem';
import { useCallback, useRef, useState } from 'react';
import { useLongPress } from '@hooks/useLongPress';
import { ChevronLeftIcon, ExclamationCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import './DisplayElements.css';

function DisplayElements({ isInteractive = false }) {
  const { memoizedProducts, selectedItems, selectionMode } = useManageItemState();
  const { toggleItem, setPendingDelete, handleSwipeLeft } = useManageItemActions();
  const [swipingItem, setSwipingItem] = useState({ id: null, deltaX: 0 });
  const productRef = useRef(null);

  const isItemBeingSwiped = useCallback(
    product => swipingItem.id === product.id && Math.abs(swipingItem.deltaX) > 5,
    [swipingItem]
  );

  const isGestureIgnored = e => e.target.closest('[data-ignore-gesture]');

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (productRef.current) {
        handleSwipeLeft(productRef.current);
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

  const handleClick = useCallback(
    product => {
      if (!isInteractive || !selectionMode || isItemBeingSwiped(product)) return;

      productRef.current = product;
      toggleItem(product);
    },
    [selectionMode, toggleItem, isItemBeingSwiped]
  );

  const handleTouchStart = useCallback(
    (e, product) => {
      if (!isInteractive || selectionMode || isGestureIgnored(e)) return;
      productRef.current = product;

      swipeHandlers.onTouchStart(e);
      longPressHandlers.onTouchStart(e);

      setSwipingItem({ id: product.id, deltaX: 0 });
    },
    [selectionMode, swipeHandlers, longPressHandlers]
  );

  const handleTouchMove = useCallback(
    e => {
      if (!isInteractive || selectionMode || isGestureIgnored(e)) return;

      swipeHandlers.onTouchMove(e);
      longPressHandlers.cancel?.();
    },
    [selectionMode, swipeHandlers, longPressHandlers]
  );

  const handleTouchEnd = useCallback(
    e => {
      if (!isInteractive || selectionMode || isGestureIgnored(e)) return;

      swipeHandlers.onTouchEnd(e);
      longPressHandlers.onTouchEnd(e);
      setSwipingItem({ id: null, deltaX: 0 });
    },
    [selectionMode, swipeHandlers, longPressHandlers]
  );

  return (
    <div className="display-elements">
      <div className="display-elements__wrapper">
        <div className="display-elements__labels">
          <span>Allergeni</span>
          <span>Nome</span>
          <span>Prezzo</span>
        </div>
        <div className="display-elements__list">
          {memoizedProducts.map(product => {
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
                {isSwiping && isInteractive && (
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
                  {!selectionMode && isInteractive && (
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
