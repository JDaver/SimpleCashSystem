import { useFetchReceipts } from '@hooks/receiptHook';
import { useFetchAll, useFetchItems } from '@hooks/productsHook';
import InfoButton from '../Components/InfoButton';
import CheckButton from '../Components/CheckButton';
import SlideButton from '../Components/SlideButton';
import TrashCanButton from '../Components/TrashCanButton';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useProductsContext } from '../../../contexts/ManageItem/ProductsContext';

export function getProps(topic, activeDelMode) {
  const labelManage = ['Allergeni', 'Nome Prodoto', 'Prezzo', 'Modifica'];
  const labelDeleteMode = ['Seleziona', 'Nome Prodoto', 'Prezzo', 'Elimina'];
  const labelReceiptColection = ['Articoli', 'Scontrino e data', 'Totale'];
  const labelItemCollection = ['Rapporto', 'Nome Prodotto', 'Venduti'];

  const { products } = useFetchAll();
  const { records: items } = useFetchItems();
  const { receipts, hasMoreNext, fetchNext } = useFetchReceipts();
  const { bottomLoaderRef, isLoading } = useInfiniteScroll(fetchNext, hasMoreNext);

  let labels = [];
  let records = [];
  let actionComponent = null;
  let sideEffectsComponent = null;
  let mode = topic;
  let switchMode = null;

  switch (topic) {
    case 'manage':
      labels = activeDelMode ? labelDeleteMode : labelManage;
      records = products || [];
      actionComponent = activeDelMode ? TrashCanButton : SlideButton;
      sideEffectsComponent = activeDelMode ? CheckButton : InfoButton;
      mode = activeDelMode ? 'delete' : 'manage';
      break;

    case 'item':
      labels = labelItemCollection;
      records = items || [];
      actionComponent = null;
      sideEffectsComponent = InfoButton;
      mode = 'item';
      break;

    case 'receipt':
      labels = labelReceiptColection;
      records = receipts || []; //funtion for receipts
      actionComponent = null;
      sideEffectsComponent = InfoButton;
      mode = 'receipt';

      break;
    default:
      labels = [];
      records = [];
      actionComponent = null;
      sideEffectsComponent = null;
      mode = topic;
  }

  return {
    labels,
    records,
    actionComponent,
    sideEffectsComponent,
    mode,
    switchMode,
    bottomLoaderRef,
    hasMoreNext,
    fetchNext,
  };
}
