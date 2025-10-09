import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import './Toast.css';

const ToastContext = createContext();

function Toast({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(toast => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(current => [...current, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback(id => {
    setToasts(current => current.filter(t => t.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  );

  return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
}

Toast.displayName = 'Toast';

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('Toast components must be wrapped in <Toast>.');
  }
  return context;
}

function ToastPortal({ children }) {
  const portalRootId = 'toast-portal-root';
  let portalRoot = document.getElementById(portalRootId);

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', portalRootId);
    document.body.appendChild(portalRoot);
  }

  return ReactDOM.createPortal(children, portalRoot);
}

ToastPortal.displayName = 'ToastPortal';
Toast.Portal = ToastPortal;

export default Toast;
