import { useFetchReceipts } from '@hooks/receiptHook';
import { useFetchItems, useFetchCashier } from '@hooks/productsHook';
import InfoButton from '../SingleItem/InfoButton';
import LensButton from '../SingleItem/LensButton';
import CheckButton from '../SingleItem/CheckButton';
import SlideButton from '../SingleItem/SlideButton';
import TrashCanButton from '../SingleItem/TrashCanButton';
import CashierButtons from '../SingleItem/CashierButtons';
import { useInfiniteScroll } from '@hooks/useInfiniteScroll';
import { useProductsContext } from '../../../contexts/ManageItem/ProductsContext';
import { useUIContext } from '@contexts/ManageItem/UIContext';
import { useSelectionContext } from '../../../contexts/ManageItem/SelectionContext';

//--------------------- CASHIER
function useCashierProps() {
  const labels = ['Allergeni', 'Articolo', 'prezzo'];
  const contentHeight = '540px';
  return {
    labels,
    actionComponent: CashierButtons,
    sideEffectsComponent: InfoButton,
    contentHeight,
  };
}

function useCashierRecords(params) {
  const { products, hasMoreNext, fetchNext } = useFetchCashier(params);
  const { bottomLoaderRef } = useInfiniteScroll(fetchNext, hasMoreNext);

  return { records: products, hasMoreNext, fetchNext, bottomLoaderRef };
}

//--------------------- MANAGE
function useManageProps() {
  const labelManage = ['Allergeni', 'Nome Prodoto', 'Prezzo', 'Modifica'];
  const labelDeleteMode = ['Seleziona', 'Nome Prodoto', 'Prezzo', 'Elimina'];
  const contentHeight = '460px';
  const { activeDelMode, setActiveDeleteMode } = useUIContext();
  const { clearSelection } = useSelectionContext();
  return {
    labels: activeDelMode ? labelDeleteMode : labelManage,
    actionComponent: activeDelMode ? TrashCanButton : SlideButton,
    sideEffectsComponent: activeDelMode ? CheckButton : InfoButton,
    mode: activeDelMode ? 'delete' : 'manage',
    setActiveDeleteMode,
    activeDelMode,
    clearSelection,
    contentHeight,
  };
}

function useManageRecords() {
  const { products, hasMoreNext, fetchNext } = useProductsContext();
  const { bottomLoaderRef } = useInfiniteScroll(fetchNext, hasMoreNext);
  return { records: products || [], hasMoreNext, fetchNext, bottomLoaderRef };
}

//--------------------- SALES HISTORY
function useItemProps() {
  const labels = ['Rapporto', 'Nome Prodotto', 'Venduti'];
  const contentHeight = '460px';
  return {
    labels,
    actionComponent: null,
    sideEffectsComponent: InfoButton,
    mode: 'item',
    contentHeight,
  };
}

function useItemRecords() {
  const { records: items, hasMoreNext, fetchNext } = useFetchItems();
  const { bottomLoaderRef, isLoading } = useInfiniteScroll(fetchNext, hasMoreNext);
  return { records: items || [], bottomLoaderRef, hasMoreNext, fetchNext };
}

//--------------------- RECEIPTS HISTORY
function useReceiptProps() {
  const labels = ['Articoli', 'Scontrino e data', 'Totale'];
  const contentHeight = '460px';

  return {
    labels,
    actionComponent: null,
    sideEffectsComponent: LensButton,
    mode: 'receipt',
    contentHeight,
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

//--------------------- MAIN HELPERS

export function useProps(topic) {
  const mapping = {
    manage: useManageProps,
    item: useItemProps,
    receipt: useReceiptProps,
    cashFood: useCashierProps,
    cashBeverage: useCashierProps,
  };
  const useCurrentProps = mapping[topic];
  return useCurrentProps
    ? useCurrentProps()
    : {
        labels: null,
        actionComponent: null,
        sideEffectsComponent: null,
        mode: 'manage',
        setActiveDeleteMode: null,
        activeDelMode: null,
        clearSelection: null,
        contentHeight: null,
      };
  return mapping[topic] || mapping['manage'];
}

export function useRecords(topic) {
  const mapping = {
    manage: useManageRecords,
    item: useItemRecords,
    receipt: useReceiptRecords,
    cashFood: () => useCashierRecords({ isBeverage: false }),
    cashBeverage: () => useCashierRecords({ isBeverage: true }),
  };

  const useCurrentRecords = mapping[topic];
  return useCurrentRecords
    ? useCurrentRecords()
    : { records: [], bottomLoaderRef: null, hasMoreNext: null, fetchNext: null };
}
