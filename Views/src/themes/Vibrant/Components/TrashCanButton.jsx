import { TrashIcon } from '@heroicons/react/24/outline';
import { useSelectionContext } from '../../../contexts/ManageItem/SelectionContext';
export default function CheckButton({ product }) {
  const { id } = product;

  return (
    <button>
      <TrashIcon height={50} width={60} />
    </button>
  );
}
