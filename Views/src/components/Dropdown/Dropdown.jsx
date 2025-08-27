import { createContext, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import './Dropdown.css';
import { useContext } from 'react';

const DropdownContext = createContext(null);

function Dropdown({ side, selected, multiple = false, onChange, children, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const baseId = useId();

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
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleToggle = useCallback(
    option => {
      if (!onChange) return;

      if (multiple) {
        if (normalizedSelected.includes(option)) {
          onChange(normalizedSelected.filter(item => item !== option));
        } else {
          onChange([...normalizedSelected, option]);
        }
      } else {
        onChange(option);
        setIsOpen(false);
      }
    },
    [multiple, normalizedSelected, onChange]
  );

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const contextValue = useMemo(
    () => ({
      selected: normalizedSelected,
      multiple,
      side,
      baseId,
      isOpen,
      handleClick,
      handleToggle,
    }),
    [normalizedSelected, multiple, side, baseId, isOpen, handleClick, handleToggle]
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
  const { handleClick, isOpen, baseId } = useDropdownContext();
  return (
    <button
      type="button"
      data-state={isOpen ? 'open' : 'closed'}
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

function DropdownContent({ children, ...props }) {
  const { isOpen, side, baseId } = useDropdownContext();

  if (!isOpen) return null;

  return (
    <div
      className={`dropdown__wrapper ${side}`}
      id={`dropdown-menu-${baseId}`}
      role="menu"
      {...props}
    >
      <ul className="dropdown__content">{children}</ul>
    </div>
  );
}

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

export default Dropdown;
