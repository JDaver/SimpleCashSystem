import {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import './Dropdown.css';
import { useContext } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const DropdownContext = createContext(null);

function Dropdown({
  side,
  selected,
  multiple = false,
  disabled = false,
  isOpen: controlledIsOpen,
  onChange,
  onOpenChange,
  children,
  ...props
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const baseId = useId();

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpenChange = useCallback(
    value => {
      if (controlledIsOpen === undefined) {
        setInternalIsOpen(value);
      }
      if (onOpenChange) onOpenChange(value);
    },
    [controlledIsOpen, onOpenChange]
  );

  const normalizedSelected = useMemo(() => {
    return multiple
      ? Array.isArray(selected)
        ? selected
        : selected != null
          ? [selected]
          : []
      : Array.isArray(selected)
        ? (selected[0] ?? null)
        : (selected ?? null);
  }, [selected, multiple]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    handleOpenChange(!isOpen);
  }, [isOpen, disabled, handleOpenChange]);

  const handleToggle = useCallback(
    option => {
      if (disabled || !onChange) return;

      if (multiple) {
        if (normalizedSelected.includes(option)) {
          onChange(normalizedSelected.filter(item => item !== option));
        } else {
          onChange([...normalizedSelected, option]);
        }
      } else {
        onChange(option);
        handleOpenChange(false);
      }
    },
    [multiple, disabled, normalizedSelected, onChange]
  );

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleOpenChange]);

  const contextValue = useMemo(
    () => ({
      selected: normalizedSelected,
      multiple,
      disabled,
      side,
      baseId,
      isOpen,
      handleClick,
      handleToggle,
    }),
    [normalizedSelected, multiple, disabled, side, baseId, isOpen, handleClick, handleToggle]
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className="dropdown" side={side} ref={dropdownRef} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.displayName = 'Dropdown';

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be wrapped within <Dropdown>.');
  }

  return context;
}

// --------------- Trigger Component

function DropdownTrigger({ children, ...props }) {
  const { handleClick, isOpen, baseId, disabled } = useDropdownContext();
  return (
    <button
      type="button"
      data-state={isOpen ? 'open' : 'closed'}
      disabled={disabled}
      id={`dropdown-button-${baseId}`}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={`dropdown-menu-${baseId}`}
      className="dropdown__trigger"
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

Dropdown.Trigger = DropdownTrigger;
DropdownTrigger.displayName = 'DropdownTrigger';

// --------------- Content Component

const DropdownContent = forwardRef(({ children, ...props }, ref) => {
  const { isOpen, side, baseId } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={`dropdown__wrapper ${side}`}
      id={`dropdown-menu-${baseId}`}
      role="menu"
      {...props}
    >
      <ul className="dropdown__content">{children}</ul>
    </div>
  );
});

Dropdown.Content = DropdownContent;
DropdownContent.displayName = 'DropdownContent';

// --------------- Item Component

function DropdownItem({ option, children, ...props }) {
  const { selected, multiple, handleToggle } = useDropdownContext();
  const isSelected = multiple ? selected.includes(option) : selected === option;

  const handleClick = () => handleToggle(option);

  return (
    <li
      role={multiple ? 'menuitemcheckbox' : 'menuitem'}
      data-selected={isSelected || undefined}
      aria-checked={multiple ? isSelected : undefined}
      className="dropdown__option"
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  );
}

Dropdown.Item = DropdownItem;
DropdownItem.displayName = 'DropdownItem';

// --------------- Submenu Component

function DropdownSubmenu({ side, label, children, isOpen: controlledIsOpen, onOpenChange }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const submenuRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const open = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ top: rect.top, left: rect.right });
    }
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(true);
    }
    if (onOpenChange) onOpenChange(true);
  }, [controlledIsOpen, onOpenChange]);

  const close = useCallback(() => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(false);
    }
    if (onOpenChange) onOpenChange(false);
  }, [controlledIsOpen, onOpenChange]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = event => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  return (
    <li ref={triggerRef} className="dropdown__option">
      <button type="button" className="dropdown__submenu-trigger" onClick={toggle}>
        {label}
        <ChevronRightIcon width={20} height={15} />
      </button>

      {isOpen && (
        <div
          ref={submenuRef}
          side={side}
          className={`dropdown__submenu-wrapper ${side}`}
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <ul className="dropdown__submenu-content">{children}</ul>
        </div>
      )}
    </li>
  );
}

Dropdown.Submenu = DropdownSubmenu;

export default Dropdown;
