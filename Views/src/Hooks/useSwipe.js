import { useRef } from 'react';

export function useSwipe({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
} = {}) {
  const touch = useRef({
    startX: null,
    startY: null,
    endX: null,
    endY: null,
  });

  const resetTouches = () => {
    touch.current = {
      startX: null,
      startY: null,
      endX: null,
      endY: null,
    };
  };

  const onTouchStart = e => {
    const { clientX, clientY } = e.changedTouches[0];
    touch.current.startX = clientX;
    touch.current.startY = clientY;
  };

  const onTouchMove = e => {
    const { clientX, clientY } = e.changedTouches[0];
    touch.current.endX = clientX;
    touch.current.endY = clientY;
  };

  const onTouchEnd = () => {
    const { startX, startY, endX, endY } = touch.current;
    if (startX == null || startY == null || endX == null || endY == null) return;

    const deltaX = startX - endX;
    const deltaY = startY - endY;
    const direction = getSwipeDirection(deltaX, deltaY, threshold);

    if (direction) handleSwipe(direction);

    resetTouches();
  };

  const getSwipeDirection = (dx, dy, threshold) => {
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX < threshold && absY < threshold) return null;
    return absX > absY ? (dx > 0 ? 'left' : 'right') : dy > 0 ? 'up' : 'down';
  };

  const handleSwipe = direction => {
    const actions = {
      left: onSwipeLeft,
      right: onSwipeRight,
      up: onSwipeUp,
      down: onSwipeDown,
    };
    actions[direction]?.();
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    getSwipeDirection,
    resetTouches,
  };
}
