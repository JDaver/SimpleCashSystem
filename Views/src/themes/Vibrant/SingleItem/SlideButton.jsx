import React, { useState, useRef, useCallback, memo } from 'react';
import { useSwipe } from '@hooks/useSwipe';
import blueArrow from '@assets/blueArrow.png';
import { useUIContext } from '@contexts/ManageItem';

function SlideButton({ record }) {
  const { handleSwipeLeft } = useUIContext();
  const [swipingItem, setSwipingItem] = useState({ id: null, deltaX: 0 });
  const recordBeingSwipedRef = useRef(null);

  const opacityButton = swipingItem.deltaX / 400 + 1;
  const swipeAmount = Math.min(Math.abs(swipingItem.deltaX), 500);
  const swipeProgress = -swipeAmount;

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (recordBeingSwipedRef.current) {
        handleSwipeLeft(recordBeingSwipedRef.current.id);
      }
    },
    onSwipeProgress: ({ deltaX }) => {
      if (recordBeingSwipedRef.current) {
        setSwipingItem({ id: recordBeingSwipedRef.current.id, deltaX });
      }
    },
    threshold: 350,
  });

  const handleTouchStart = useCallback(
    (e, record) => {
      recordBeingSwipedRef.current = record;

      swipeHandlers.onTouchStart(e);
      setSwipingItem({ id: record.id, deltaX: 0 });
    },
    [swipeHandlers]
  );

  const handleTouchMove = useCallback(
    e => {
      swipeHandlers.onTouchMove(e);
    },
    [swipeHandlers]
  );

  const handleTouchEnd = useCallback(
    e => {
      swipeHandlers.onTouchEnd(e);
      setSwipingItem({ id: null, deltaX: 0 });
    },
    [swipeHandlers]
  );

  return (
    <button
      className="slide-button"
      onTouchStart={e => handleTouchStart(e, record)}
      onTouchMove={e => handleTouchMove(e)}
      onTouchEnd={e => handleTouchEnd(e)}
      style={{
        transform: `translateX(${swipeProgress}px)`,
        opacity: opacityButton,
        transition: 'transform 0.6s cubic-bezier(0.45, 1.85, 0.82, 1)',
        touchAction: 'pan-y',
      }}
    >
      <img src={blueArrow} height={50} width={50} />
    </button>
  );
}
export default React.memo(SlideButton);
