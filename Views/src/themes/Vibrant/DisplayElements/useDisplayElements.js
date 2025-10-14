import { useFetchReceipts } from '@hooks/receiptHook';
import { useFetchItems } from '@hooks/productsHook';
import InfoButton from '../Components/InfoButton';
import CheckButton from '../Components/CheckButton';
import SlideButton from '../Components/SlideButton';
import TrashCanButton from '../Components/TrashCanButton';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useProductsContext } from '../../../contexts/ManageItem/ProductsContext';

function useManageProps(activeDelMode) {
  const labelManage = ['Allergeni', 'Nome Prodoto', 'Prezzo', 'Modifica'];
  const labelDeleteMode = ['Seleziona', 'Nome Prodoto', 'Prezzo', 'Elimina'];
  return {
    labels: activeDelMode ? labelDeleteMode : labelManage,
    actionComponent: activeDelMode ? TrashCanButton : SlideButton,
    sideEffectsComponent: activeDelMode ? CheckButton : InfoButton,
    mode: activeDelMode ? 'delete' : 'manage',
  };
}

function useManageRecords() {
  const { products } = useProductsContext();
  return { records: products || [] };
}

function useItemProps() {
  const labels = ['Rapporto', 'Nome Prodotto', 'Venduti'];
  return {
    labels,
    actionComponent: null,
    sideEffectsComponent: InfoButton,
    mode: 'item',
  };
}

function useItemRecords() {
  const { records: items } = useFetchItems();
  return { records: items || [] };
}

function useReceiptProps() {
  const labels = ['Articoli', 'Scontrino e data', 'Totale'];

  return {
    labels,
    actionComponent: null,
    sideEffectsComponent: InfoButton,
    mode: 'receipt',
  };
}

function useReceiptRecords() {
  const { receipts, hasMoreNext, fetchNext } = useFetchReceipts();
  const { bottomLoaderRef, isLoading } = useInfiniteScroll(fetchNext, hasMoreNext);
  return {
    records: receipts || [],
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
  const useCurrentProps = mapping[topic];
  return useCurrentProps
    ? useCurrentProps()
    : {
        labels: [],
        actionComponent: null,
        sideEffectsComponent: null,
        mode: topic,
      };
}

export function useRecords(topic) {
  const mapping = {
    manage: useManageRecords,
    item: useItemRecords,
    receipt: useReceiptRecords,
  };
  const useCurrentRecords = mapping[topic];
  return useCurrentRecords
    ? useCurrentRecords()
    : { records: [], bottomLoaderRef: null, hasMoreNext: null };
}
