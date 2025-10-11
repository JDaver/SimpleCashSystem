import { useFetchReceipts } from '@hooks/receiptHook';
import { useFetchItems } from '@hooks/productsHook';
import InfoButton from '../Components/InfoButton';
import CheckButton from '../Components/CheckButton';
import SlideButton from '../Components/SlideButton';
import TrashCanButton from '../Components/TrashCanButton';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useProductsContext } from '../../../contexts/ManageItem/ProductsContext';

function useManageProps(activeDelMode) {
  const { products } = useProductsContext();
  const labelManage = ['Allergeni', 'Nome Prodoto', 'Prezzo', 'Modifica'];
  const labelDeleteMode = ['Seleziona', 'Nome Prodoto', 'Prezzo', 'Elimina'];
  return {
    labels: activeDelMode ? labelDeleteMode : labelManage,
    records: products || [],
    actionComponent: activeDelMode ? TrashCanButton : SlideButton,
    sideEffectsComponent: activeDelMode ? CheckButton : InfoButton,
    mode: activeDelMode ? 'delete' : 'manage',
  };
}

function useItemProps() {
  const { records: items } = useFetchItems();
  const labels = ['Rapporto', 'Nome Prodotto', 'Venduti'];
  return {
    labels,
    records: items || [],
    actionComponent: null,
    sideEffectsComponent: InfoButton,
    mode: 'item',
  };
}

function useReceiptProps() {
  const { receipts, hasMoreNext, fetchNext } = useFetchReceipts();
  const { bottomLoaderRef, isLoading } = useInfiniteScroll(fetchNext, hasMoreNext);
  const labels = ['Articoli', 'Scontrino e data', 'Totale'];

  return {
    labels,
    records: receipts || [],
    actionComponent: null,
    sideEffectsComponent: InfoButton,
    mode: 'receipt',
    bottomLoaderRef,
    hasMoreNext,
    fetchNext,
  };
}

export function useProps(topic, activeDelMode) {
  const mapping = {
    manage: () => useManageProps(activeDelMode),
    item: useItemProps,
    receipt: useReceiptProps,
  };
  const useCurrent = mapping[topic];
  return useCurrent
    ? useCurrent()
    : {
        labels: [],
        records: [],
        actionComponent: null,
        sideEffectsComponent: null,
        mode: topic,
      };
}
