import { useRef, useCallback, useEffect } from 'react';

export function useLongPress(onLongPress, delay = 800) {
  const timerRef = useRef(null);
  const hasFiredRef = useRef(false);

  const startEvent = useCallback(() => {
    hasFiredRef.current = false;

    timerRef.current = setTimeout(() => {
      onLongPress?.();
      hasFiredRef.current = true;
    }, delay);
  }, [onLongPress, delay]);

  const cancelEvent = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    hasFiredRef.current = true;
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    onTouchStart: startEvent,
    onTouchEnd: cancelEvent,
    onTouchMove: cancelEvent,
    onMouseDown: startEvent,
    onMouseUp: cancelEvent,
    onMouseLeave: cancelEvent,
  };
}
