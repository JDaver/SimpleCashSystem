import { useRef, useCallback, useEffect } from 'react';

export function useLongPress(onLongPress, delay = 800) {
  const timerRef = useRef(null);

  const startEvent = useCallback(() => {
    timerRef.current = setTimeout(() => {
      onLongPress?.();
    }, delay);
  }, [onLongPress, delay]);

  const cancelEvent = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    onTouchStart: startEvent,
    onTouchEnd: cancelEvent,
    onTouchMove: cancelEvent,
    onMouseDown: startEvent,
    onMouseUp: cancelEvent,
    onMouseLeave: cancelEvent,
    cancel: cancelEvent,
  };
}
