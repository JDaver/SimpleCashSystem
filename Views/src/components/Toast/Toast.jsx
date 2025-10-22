import { toastReducer } from '../../reducers/toastReducer';
import ReactDOM from 'react-dom';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';

const ANIMATION_DURATION = 300;

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const timersRef = useRef({});

  const clearTimer = id => {
    const timerData = timersRef.current[id];
    if (timerData) {
      clearTimeout(timerData.timerId);
      delete timersRef.current[id];
    }
  };

  const startCloseTimer = (id, duration) => {
    const start = Date.now();
    const timerId = setTimeout(() => {
      dispatch({ type: 'CLOSE', id });
      delete timersRef.current[id];
    }, duration);

    timersRef.current[id] = { timerId, start, remaining: duration };
  };

  const addToast = useCallback(toast => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = toast.duration ?? 5000;

    dispatch({ type: 'ADD', toast: { ...toast, id, isOpen: true } });
    requestAnimationFrame(() => {
      dispatch({ type: 'OPEN', id });
      startCloseTimer(id, duration);
    });
  }, []);

  const closeToast = useCallback(id => {
    clearTimer(id);
    dispatch({ type: 'CLOSE', id });
  }, []);

  const removeToast = useCallback(id => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const pauseTimer = useCallback(id => {
    const timerData = timersRef.current[id];
    if (timerData) {
      clearTimeout(timerData.timerId);
      const elapsed = Date.now() - timerData.start;
      const remaining = timerData.remaining - elapsed;
      timersRef.current[id] = {
        ...timerData,
        remaining: remaining > 0 ? remaining : 0,
      };
    }
  }, []);

  const resumeTimer = useCallback(
    id => {
      const timerData = timersRef.current[id];
      if (!timerData) return;
      if (timerData.timerId) clearTimeout(timerData.timerId);
      const safeRemaining = Math.max(timerData.remaining, 1000);

      const start = Date.now();
      const timerId = setTimeout(() => {
        dispatch({ type: 'CLOSE', id });
        delete timersRef.current[id];
      }, safeRemaining);

      timersRef.current[id] = { timerId, start, remaining: safeRemaining };
    },
    [dispatch]
  );

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach(t => clearTimeout(t.timerId));
      timersRef.current = {};
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      toasts,
      addToast,
      closeToast,
      removeToast,
      pauseTimer,
      resumeTimer,
    }),
    [toasts, addToast, closeToast, removeToast, pauseTimer, resumeTimer]
  );

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
};

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used in <ToastProvider>.');
  }

  return context;
}

const Toast = ({ id, content, isOpen = true, onClose, onPause, onResume, isExiting = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onTouchStart={onPause}
      onTouchEnd={onResume}
      onTouchCancel={onResume}
      style={{
        opacity: isVisible && !isExiting ? 1 : 0,
        transform:
          isVisible && !isExiting
            ? 'translateX(0)'
            : isExiting
              ? 'translateX(100%)'
              : 'translateX(100%)',
        transition: `opacity ${ANIMATION_DURATION}ms ease, transform ${ANIMATION_DURATION}ms ease`,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {typeof content === 'function' ? content({ id, onClose, onPause, onResume }) : content}
    </div>
  );
};

const ToastPortal = ({ children, ...props }) => {
  const portalRootId = 'toast-portal-root';
  let portalRoot = document.getElementById(portalRootId);

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', portalRootId);
    document.body.appendChild(portalRoot);
  }

  return ReactDOM.createPortal(<div {...props}>{children}</div>, portalRoot);
};

ToastPortal.displayName = 'ToastPortal';

const ToastContainer = () => {
  const { toasts, pauseTimer, resumeTimer } = useToast();
  const [positions, setPositions] = useState({});

  const containerRef = useRef(null);
  const toastHeights = useRef({});
  const isUserInteracting = useRef(false);

  const measureHeightsAndSetPositions = useCallback(() => {
    if (isUserInteracting.current) return;

    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;

      const newHeights = {};
      container.childNodes.forEach(node => {
        const el = node;
        if (el.dataset.id) {
          newHeights[el.dataset.id] = el.offsetHeight + 12;
        }
      });

      toastHeights.current = newHeights;
      const newPositions = {};
      let offset = 0;

      for (let i = toasts.length - 1; i >= 0; i--) {
        const toast = toasts[i];
        newPositions[toast.id] = offset;
        offset += newHeights[toast.id] || 0;
      }

      setPositions(newPositions);
    });
  }, [toasts]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      if (!isUserInteracting.current) measureHeightsAndSetPositions();
    });

    container.childNodes.forEach(node => observer.observe(node));

    return () => observer.disconnect();
  }, [measureHeightsAndSetPositions, toasts.length]);

  const freezeInteraction = useCallback(() => {
    if (!isUserInteracting.current) {
      isUserInteracting.current = true;
      toasts.forEach(t => pauseTimer(t.id));
    }
  }, [toasts, pauseTimer]);

  const unfreezeInteraction = useCallback(() => {
    if (isUserInteracting.current) {
      isUserInteracting.current = false;
      toasts.forEach(t => resumeTimer(t.id));
      measureHeightsAndSetPositions();
    }
  }, [toasts, resumeTimer, measureHeightsAndSetPositions]);

  return (
    <ToastPortal>
      <div
        ref={containerRef}
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          maxWidth: '90vw',
          width: 320,
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 9999,
        }}
      >
        {toasts.map(toast => (
          <ToastFrame
            key={toast.id}
            toast={toast}
            bottomOffset={positions[toast.id] ?? 0}
            onInteractionStart={freezeInteraction}
            onInteractionEnd={unfreezeInteraction}
          />
        ))}
      </div>
    </ToastPortal>
  );
};

const ToastFrame = ({ toast, bottomOffset, onInteractionStart, onInteractionEnd }) => {
  const { closeToast, removeToast, pauseTimer, resumeTimer } = useToast();
  const { id, isOpen } = toast;

  const [isExiting, setIsExiting] = useState(false);

  const handleTouchStart = useCallback(() => {
    onInteractionStart();
  }, [onInteractionStart]);

  const handleTouchEnd = useCallback(() => {
    onInteractionEnd(800);
  }, [onInteractionEnd]);

  useEffect(() => {
    if (!isOpen) {
      onInteractionEnd(0);
      setIsExiting(true);
      const timer = setTimeout(() => removeToast(id), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    } else {
      setIsExiting(false);
    }
  }, [isOpen, removeToast, id, onInteractionEnd]);

  return (
    <div
      data-id={id}
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        pointerEvents: 'auto',
        transform: `translateY(-${bottomOffset}px)`,
        transition: `transform ${ANIMATION_DURATION}ms ease`,
        willChange: 'transform',
      }}
      onMouseEnter={() => onInteractionStart()}
      onMouseLeave={() => onInteractionEnd(80)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => onInteractionEnd(150)}
    >
      <Toast
        {...toast}
        isOpen={!isExiting}
        onClose={() => closeToast(id)}
        onPause={() => pauseTimer(id)}
        onResume={() => resumeTimer(id)}
        isExiting={isExiting}
      />
    </div>
  );
};

Toast.Container = ToastContainer;
ToastContainer.displayName = 'ToastContainer';

export default Toast;
