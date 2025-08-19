import { useCallback, useEffect, useRef, useState } from 'react';
import './Dropdown.css';

function Dropdown({ icon, ...props }) {
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

  return (
    <div className="dropdown" ref={dropdownRef} {...props}>
      <button className="dropdown__trigger" onClick={handleClick}>
        {icon}
      </button>
      {isOpen && (
        <div className="dropdown__wrapper">
          <ul className="dropdown__content">
            <li className="dropdown__option">opt 1</li>
            <li className="dropdown__option">opt 2</li>
            <li className="dropdown__option">opt 3</li>
            <li className="dropdown__option">opt 4</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
