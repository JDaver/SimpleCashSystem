import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function InfoButton({ Icon = ExclamationTriangleIcon, Data = null, active = false, ...props }) {
  const items = Array.isArray(Data) ? Data : Data ? [Data] : [];

  return (
    <div>

      <button {...props}>
        <Icon
          className="text-yellow-500"
          style={{ width: props.width || 24, height: props.height || 24 }}
        />
      </button>

      {active && items.length > 0 && (
        <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 p-2 z-10 allergensPopOver">
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