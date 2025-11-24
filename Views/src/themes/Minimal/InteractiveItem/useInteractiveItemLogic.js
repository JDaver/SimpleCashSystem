import { useRef, useState, useCallback, useMemo } from 'react';
import { useSwipe } from '@hooks/useSwipe';
import { useLongPress } from '@hooks/useLongPress';
import { useSelectionContext, useUIContext } from '@contexts/ManageItem';

export function useInteractiveItemLogic(id, selectionMode) {
  const { toggleItem } = useSelectionContext();
  const { setPendingDelete, handleSwipeLeft } = useUIContext();
  const [deltaX, setDeltaX] = useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const isScrolling = useRef(false);
  const localRef = useRef(id);

  const isSwiping = useMemo(() => Math.abs(deltaX) > 5, [deltaX]);

  const isGestureIgnored = useCallback(e => e.target.closest('[data-ignore-gesture]'), []);

  const onLongPress = useCallback(() => {
    if (isSwiping) return;
    toggleItem(localRef.current);
  }, [isSwiping, toggleItem]);

  const longPressHandlers = useLongPress(onLongPress);

  const onSwipeLeft = useCallback(() => {
    if (localRef.current) {
      handleSwipeLeft(localRef.current);
      setDeltaX(0);
    }
  }, [handleSwipeLeft]);

  const onSwipeProgress = useCallback(
    ({ deltaX: newDeltaX }) => {
      if (Math.abs(newDeltaX) > 5) {
        longPressHandlers.cancel?.();
      }
      setDeltaX(prev => (prev !== newDeltaX ? newDeltaX : prev));
    },
    [longPressHandlers]
  );

  const swipeHandlers = useSwipe({
    onSwipeLeft,
    onSwipeProgress,
    threshold: 30,
  });

  const handleClick = useCallback(() => {
    if (!selectionMode || isSwiping) return;
    toggleItem(localRef.current);
  }, [selectionMode, isSwiping, toggleItem]);

  const handleTouchStart = useCallback(
    e => {
      if (selectionMode || isGestureIgnored(e)) return;

      const touch = e.touches[0];
      startX.current = touch.clientX;
      startY.current = touch.clientY;
      isScrolling.current = false;

      swipeHandlers.onTouchStart(e);
      longPressHandlers.onTouchStart(e);
      setDeltaX(0);
    },
    [, selectionMode, swipeHandlers, longPressHandlers]
  );

  const handleTouchMove = useCallback(
    e => {
      if (selectionMode || isGestureIgnored(e)) return;

      const touch = e.touches[0];
      const deltaXAbs = Math.abs(touch.clientX - startX.current);
      const deltaYAbs = Math.abs(touch.clientY - startY.current);

      if (!isScrolling.current && deltaYAbs > deltaXAbs && deltaYAbs > 10) {
        isScrolling.current = true;
      }

      if (isScrolling.current) {
        longPressHandlers.cancel?.();
        return;
      }

      swipeHandlers.onTouchMove(e);
    },
    [selectionMode, swipeHandlers, longPressHandlers]
  );

  const handleTouchEnd = useCallback(
    e => {
      if (selectionMode || isGestureIgnored(e)) return;
      swipeHandlers.onTouchEnd(e);
      longPressHandlers.onTouchEnd(e);
      setDeltaX(0);
      isScrolling.current = false;
    },
    [selectionMode, swipeHandlers, longPressHandlers]
  );

  const swipeProgress = Math.min(Math.abs(deltaX), 100) / 100;

  return {
    swipeProgress,
    isSwiping,
    setPendingDelete,
    handleClick,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
