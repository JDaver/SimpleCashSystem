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

const POSITION_STYLES = {
  'top-left': { top: 16, left: 16 },
  'top-right': { top: 16, right: 16 },
  'bottom-left': { bottom: 16, left: 16 },
  'bottom-right': { bottom: 16, right: 16 },
  'top-center': { top: 16, left: '50%', transform: 'translateX(-50%)' },
  'bottom-center': { bottom: 16, left: '50%', transform: 'translateX(-50%)' },
};

const baseContainerStyle = {
  position: 'fixed',
  maxWidth: '90vw',
  width: 320,
  pointerEvents: 'none',
  overflow: 'visible',
  zIndex: 9999,
};

const ToastContext = createContext(null);

export const ToastProvider = ({ children, position = 'bottom-right' }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const timersRef = useRef({});

  const clearTimer = useCallback(id => {
    const timerData = timersRef.current[id];
    if (timerData) {
      clearTimeout(timerData.timerId);
      delete timersRef.current[id];
    }
  }, []);

  const startCloseTimer = useCallback(
    (id, duration) => {
      const start = Date.now();
      const timerId = setTimeout(() => {
        dispatch({ type: 'CLOSE', id });

        const removeTimer = setTimeout(() => {
          dispatch({ type: 'REMOVE', id });
          delete timersRef.current[id];
        }, ANIMATION_DURATION);

        timersRef.current[id].removeTimerId = removeTimer;
      }, duration);

      timersRef.current[id] = { timerId, start, remaining: duration, removeTimerId: null };
    },
    [dispatch]
  );
  const addToast = useCallback(
    toast => {
      const id = Math.random().toString(36).substring(2, 9);
      const duration = toast.duration ?? 5000;
      const position = toast.position ?? 'bottom-right';

      dispatch({ type: 'ADD', toast: { ...toast, id, isOpen: false, position } });
      requestAnimationFrame(() => {
        dispatch({ type: 'OPEN', id });
        startCloseTimer(id, duration);
      });
    },
    [dispatch, startCloseTimer]
  );

  const closeToast = useCallback(
    id => {
      clearTimer(id);
      dispatch({ type: 'CLOSE', id });
    },
    [dispatch, clearTimer]
  );

  const removeToast = useCallback(
    id => {
      dispatch({ type: 'REMOVE', id });
    },
    [dispatch]
  );

  const pauseTimer = useCallback(id => {
    const timerData = timersRef.current[id];
    if (timerData) {
      clearTimeout(timerData.timerId);
      if (timerData.removeTimerId) clearTimeout(timerData.removeTimerId);
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
      if (timerData.removeTimerId) clearTimeout(timerData.removeTimerId);

      const safeRemaining = Math.max(timerData.remaining, 0);
      if (safeRemaining <= 0) {
        dispatch({ type: 'CLOSE', id });
        const removeTimer = setTimeout(() => {
          dispatch({ type: 'REMOVE', id });
          delete timersRef.current[id];
        }, ANIMATION_DURATION);
        timersRef.current[id].removeTimerId = removeTimer;
        return;
      }

      const start = Date.now();
      const timerId = setTimeout(() => {
        dispatch({ type: 'CLOSE', id });
        const removeTimer = setTimeout(() => {
          dispatch({ type: 'REMOVE', id });
          delete timersRef.current[id];
        }, ANIMATION_DURATION);
        timersRef.current[id].removeTimerId = removeTimer;
      }, safeRemaining);

      timersRef.current[id] = { timerId, start, remaining: safeRemaining, removeTimerId: null };
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
      position,
    }),
    [toasts, addToast, closeToast, removeToast, pauseTimer, resumeTimer, position]
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

const Toast = ({
  id,
  content,
  isOpen = true,
  onClose,
  onPause,
  onResume,
  isExiting = false,
  position: propPosition,
}) => {
  const { position: providerPosition } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const position = propPosition ?? providerPosition;

  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const isLeft = position.includes('left');
  const isRight = position.includes('right');
  const isTop = position.includes('top');
  const isBottom = position.includes('bottom');

  const initialTransform = (() => {
    if (isLeft) {
      return 'translateX(-100%)';
    }
    if (isRight) {
      return 'translateX(100%)';
    }
    if (isTop) {
      return 'translateY(-100%)';
    }
    if (isBottom) {
      return 'translateY(100%)';
    }
    return 'translateY(-100%)';
  })();

  const style = {
    opacity: isVisible && !isExiting ? 1 : 0,
    transform: isVisible && !isExiting ? 'translateX(0) translateY(0)' : initialTransform,
    transition: `opacity ${ANIMATION_DURATION}ms ease, transform ${ANIMATION_DURATION}ms ease`,
    pointerEvents: isVisible ? 'auto' : 'none',
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onTouchStart={onPause}
      onTouchEnd={onResume}
      onTouchCancel={onResume}
      style={style}
    >
      {typeof content === 'function'
        ? content({ id, position: position, onClose, onPause, onResume })
        : content}
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
  const { toasts, pauseTimer, resumeTimer, position: defaultPosition } = useToast();
  const [positions, setPositions] = useState({});
  const containerRefs = useRef({
    'top-left': null,
    'top-right': null,
    'bottom-left': null,
    'bottom-right': null,
    'top-center': null,
    'bottom-center': null,
  });

  const toastHeights = useRef({});
  const isUserInteracting = useRef(false);

  const toastByPosition = toasts.reduce(
    (acc, toast) => {
      const pos = toast.position ?? defaultPosition;
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(toast);
      return acc;
    },
    {
      'top-left': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-right': [],
      'top-center': [],
      'bottom-center': [],
    }
  );

  const orderToasts = (group, pos) => (pos.includes('top') ? [...group].reverse() : group);

  const measureHeightsAndSetPositions = useCallback(() => {
    if (isUserInteracting.current) return;

    requestAnimationFrame(() => {
      const newHeights = {};
      Object.values(containerRefs.current).forEach(container => {
        if (!container) return;
        container.childNodes.forEach(node => {
          const el = node;
          if (el.dataset.id) newHeights[el.dataset.id] = el.offsetHeight + 12;
        });
      });
      toastHeights.current = newHeights;

      const newPositions = {};
      Object.entries(toastByPosition).forEach(([pos, group]) => {
        const isTop = pos.includes('top');
        const ordered = isTop ? [...group].reverse() : [...group];
        let offset = 0;

        if (isTop) {
          for (const toast of ordered) {
            newPositions[toast.id] = offset;
            offset += newHeights[toast.id] || 0;
          }
        } else {
          for (let i = ordered.length - 1; i >= 0; i--) {
            const toast = ordered[i];
            newPositions[toast.id] = offset;
            offset += newHeights[toast.id] || 0;
          }
        }
      });

      setPositions(newPositions);
    });
  }, [toastByPosition]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!isUserInteracting.current) measureHeightsAndSetPositions();
    });

    Object.values(containerRefs.current).forEach(container => {
      if (!container) return;
      container.childNodes.forEach(node => observer.observe(node));
    });

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
      {Object.entries(toastByPosition).map(([pos, group]) => {
        if (!group.length) return null;

        const orderedToasts = orderToasts(group, pos);

        const positionStyles = {
          ...baseContainerStyle,
          ...(POSITION_STYLES[pos] ?? { bottom: 16, right: 16 }),
        };

        return (
          <div
            key={pos}
            ref={el => (containerRefs.current[pos] = el)}
            aria-live="polite"
            style={positionStyles}
          >
            {orderedToasts.map(toast => (
              <ToastFrame
                key={toast.id}
                toast={toast}
                offset={positions[toast.id] ?? 0}
                onInteractionStart={freezeInteraction}
                onInteractionEnd={unfreezeInteraction}
              />
            ))}
          </div>
        );
      })}
    </ToastPortal>
  );
};

Toast.Container = ToastContainer;
ToastContainer.displayName = 'ToastContainer';

const ToastFrame = ({ toast, offset, onInteractionStart, onInteractionEnd }) => {
  const { closeToast, removeToast } = useToast();
  const { id, isOpen } = toast;

  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsExiting(true);
      const timer = setTimeout(() => removeToast(id), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    } else {
      setIsExiting(false);
    }
  }, [isOpen, removeToast, id]);

  const isTopPosition = toast.position?.includes('top');

  return (
    <div
      data-id={id}
      style={{
        position: 'absolute',
        right: 0,
        width: '100%',
        pointerEvents: 'auto',
        transition: `top ${ANIMATION_DURATION}ms ease, bottom ${ANIMATION_DURATION}ms ease`,
        willChange: 'top, bottom',
        ...(isTopPosition ? { top: offset } : { bottom: offset }),
      }}
      onMouseEnter={onInteractionStart}
      onMouseLeave={() => onInteractionEnd()}
      onTouchStart={onInteractionStart}
      onTouchEnd={() => onInteractionEnd()}
      onTouchCancel={() => onInteractionEnd()}
    >
      <Toast
        {...toast}
        isOpen={!isExiting}
        onClose={() => closeToast(id)}
        onPause={() => {}}
        onResume={() => {}}
        isExiting={isExiting}
      />
    </div>
  );
};

export default Toast;
