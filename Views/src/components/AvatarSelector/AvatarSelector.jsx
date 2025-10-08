import './AvatarSelector.css';

const avatars = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' },
  { id: 5, name: 'E' },
  { id: 6, name: 'F' },
  { id: 7, name: 'G' },
  { id: 8, name: 'H' },
];

function AvatarSelector({ selected, onSelect }) {
  return (
    <div className="avatar-selector">
      {avatars.map(a => (
        <button
          key={a.id}
          type="button"
          className={`avatar-option ${selected === a.id ? 'selected' : ''}`}
          onClick={() => onSelect(a.id)}
        >
          <div className="avatar-circle">{a.name}</div>
        </button>
      ))}
    </div>
  );
}

export default AvatarSelector;
