import { useState, useCallback, useRef } from 'react';
import { cashierMode } from '../constants/cashierMode';

export function useMode(initialMode = cashierMode[0]) {
  const [mode, setMode] = useState(initialMode);
  const disabled = useRef(false);

  const switchMode = useCallback(() => {
    if (disabled.current) return;

    const newMode = mode.label === 'Cucina' ? cashierMode[1] : cashierMode[0];
    setMode(newMode);
    disabled.current = true;
    setTimeout(() => (disabled.current = false), 300);
  }, [mode]);

  return { mode, switchMode, disabled };
}
