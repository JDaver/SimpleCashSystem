import './Receipt.css';
import TableReceipt from './TableReceipt';
import ControlButtons from './ControlButtons';
import { useReceipt } from '@contexts/receiptHandlerContext';

export default function Receipt(width) {
  const { receipt, totalOfReceipt } = useReceipt();
  return (
    <div className="receipt_wrapper">
      <TableReceipt receipt={receipt} totalOfReceipt={totalOfReceipt} />
      <ControlButtons />
    </div>
  );
}
