import React, { useCallback, useMemo } from 'react';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';

export default function InfoButton({ Data = null, active = false, width, height }) {
  const [show, setShow] = useState();
  const popOverRef = useRef(null);
  let Icon = ListBulletIcon;

  const items = useMemo(() => {
    if (!Data) return [];
    return Array.isArray(Data) ? Data : [Data];
  }, [Data]);

  useClickOutside(popOverRef, () => setShow(false));

  const handleClick = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  return (
    <div ref={popOverRef}>
      {active && (
        <button
          onClick={() => handleClick()}
          className={show ? 'info-button-active' : 'info-button'}
        >
          <Icon style={{ width: width || 24, height: height || 24 }} />
        </button>
      )}

      {show && items.length > 0 && (
        <div className="allergensPopOver">
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
