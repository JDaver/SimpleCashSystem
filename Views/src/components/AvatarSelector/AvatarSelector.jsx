import './AvatarSelector.css';
import { avatars } from '@utils/constants/avatars';

function AvatarSelector({ selected, onSelect }) {
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

export default AvatarSelector;
