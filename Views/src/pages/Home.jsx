import { useMemo } from 'react';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import { useTheme } from '@contexts/useTheme';
import Receipt from '@components/Receipt';
import {ReceiptProvider} from '@contexts/receiptHandlerContext';
function Home() {

const { theme } = useTheme();
  const CashierScreen = useMemo(() => loadThemedComponent(theme, 'CashierScreen'), [theme]);
  return (
    <ReceiptProvider>
      <CashierScreen />
      <Receipt />
    </ReceiptProvider>
  );
}

export default Home;
