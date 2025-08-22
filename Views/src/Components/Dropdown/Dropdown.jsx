import { useCallback, useEffect, useRef, useState } from 'react';
import './Dropdown.css';

function Dropdown({ icon, side, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buttonId = 'dropdown-button';
  const menuId = 'dropdown-menu';

  return (
    <div className="dropdown" side={side} ref={dropdownRef} {...props}>
      <button
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="true"
        className="dropdown__trigger"
        onClick={handleClick}
      >
        {icon}
      </button>
      {isOpen && (
        <div className={`dropdown__wrapper ${side}`}>
          <ul role="menu" aria-labelledby={buttonId} className="dropdown__content">
            <li role="menuitem" className="dropdown__option">
              opt 1
            </li>
            <li role="menuitem" className="dropdown__option">
              opt 2
            </li>
            <li role="menuitem" className="dropdown__option">
              opt 3
            </li>
            <li role="menuitem" className="dropdown__option">
              opt 4
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
