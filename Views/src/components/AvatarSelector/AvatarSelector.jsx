import React, { useCallback } from 'react';
import './AvatarSelector.css';
import { avatars } from '@utils/constants/avatars';

function AvatarSelector({ selected, onSelect }) {
  const handleSelect = useCallback(
    id => {
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <div className="avatar-selector">
      {Array.from(avatars.entries()).map(([id, url]) => (
        <button
          key={id}
          type="button"
          className={`avatar-option ${selected === url ? 'selected' : ''}`}
          onClick={() => onSelect(url)}
        >
          <div className="avatar-circle">
            <img src={url} alt={url} />
          </div>
        </button>
      ))}
    </div>
  );
}

export default React.memo(AvatarSelector);
