import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = createContext();

export function Modal({ children, isOpen: controlledIsOpen, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  const isControlled = controlledIsOpen !== undefined;
  const actualIsOpen = isControlled ? controlledIsOpen : isOpen;

  const open = useCallback(() => {
    if (!isControlled) setIsOpen(true);
  }, [isControlled]);

  const close = useCallback(() => {
    if (isControlled) {
      if (onClose) onClose();
    } else {
      setIsOpen(false);
    }
  }, [isControlled, onClose]);

  const contextValue = useMemo(
    () => ({
      isOpen: actualIsOpen,
      open,
      close,
    }),
    [actualIsOpen, open, close]
  );

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
}

Modal.displayName = 'Modal';

// helper function for modal context

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be wrapped in <Modal>.');
  }
  return context;
}

// ------------ Portal component

export function ModalPortal({ children }) {
  const portalRootId = 'modal-portal-root';
  let portalRoot = document.getElementById(portalRootId);

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', portalRootId);
    document.body.appendChild(portalRoot);
  }

  return ReactDOM.createPortal(children, portalRoot);
}

ModalPortal.displayName = 'ModalPortal';
Modal.Portal = ModalPortal;

// ------------ Trigger component

export function ModalTrigger({ children }) {
  const { open } = useModalContext();

  return React.cloneElement(children, {
    onClick: e => {
      if (children.props.onClick) children.props.onClick(e);
      open();
    },
  });
}

ModalTrigger.displayName = 'ModalTrigger';
Modal.Trigger = ModalTrigger;

// ------------ Close component

export function ModalClose({ children }) {
  const { close } = useModalContext();

  return React.cloneElement(children, {
    onClick: e => {
      if (children.props.onClick) children.props.onClick(e);
      close();
    },
  });
}

ModalClose.displayName = 'ModalClose';
Modal.Close = ModalClose;

// ------------ Overlay component

export function ModalOverlay({ closeOnClickOutside = false }) {
  const { close, isOpen } = useModalContext();

  if (!isOpen) return null;

  return (
    <div
      className="modal__overlay"
      onClick={() => {
        if (closeOnClickOutside) close();
      }}
    />
  );
}

ModalOverlay.displayName = 'ModalOverlay';
Modal.Overlay = ModalOverlay;

// ------------ Header component

export function ModalHeader({ className, children, ...props }) {
  const combinedClassName = ['modal__header', className].filter(Boolean).join(' ');
  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

ModalHeader.displayName = 'ModalHeader';
Modal.Header = ModalHeader;

// ------------ Content component

export function ModalContent({ className, children, ...props }) {
  const { isOpen } = useModalContext();
  const combinedClassName = ['modal__content', className].filter(Boolean).join(' ');

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={combinedClassName}
      {...props}
    >
      {children}
    </div>
  );
}

ModalContent.displayName = 'ModalContent';
Modal.Content = ModalContent;

// ------------ Footer component

export function ModalFooter({ className, children, ...props }) {
  const combinedClassName = ['modal__footer', className].filter(Boolean).join(' ');
  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

ModalFooter.displayName = 'ModalFooter';
Modal.Footer = ModalFooter;

// ------------ Title component

export function ModalTitle({ className, children, ...props }) {
  const combinedClassName = ['modal__title', className].filter(Boolean).join(' ');
  return (
    <h2 id="modal-title" className={combinedClassName} {...props}>
      {children}
    </h2>
  );
}

ModalTitle.displayName = 'ModalTitle';
Modal.Title = ModalTitle;

// ------------ Description component

export function ModalDescription({ className, children, ...props }) {
  const combinedClassName = ['modal__description', className].filter(Boolean).join(' ');
  return (
    <p id="modal-description" className={combinedClassName} {...props}>
      {children}
    </p>
  );
}

ModalDescription.displayName = 'ModalDescription';
Modal.Description = ModalDescription;

export default Modal;
