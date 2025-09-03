import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function InfoButton({ Icon = ExclamationTriangleIcon, Data = null, active = false, ...props }) {
  const items = Array.isArray(Data) ? Data : Data ? [Data] : [];

  return (
    <>
      <button {...props }>
        <Icon  style={{ width: props.width || 24, height: props.height || 24 }} />
      </button>
      
      {active && items.length > 0 && (
        <div className="allergensPopOver">
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}