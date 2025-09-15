import { useMemo } from 'react';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import { useTheme } from '@contexts/Theme';
import { ReceiptProvider } from '@contexts/receiptHandlerContext';
function Home() {
  const { theme } = useTheme();
  const CashierScreen = useMemo(() => loadThemedComponent(theme, 'CashierScreen'), [theme]);
  const Receipt = useMemo(() => loadThemedComponent(theme, 'Receipt'), [theme]);
  return (
    <ReceiptProvider>
      <CashierScreen />
      <Receipt />
    </ReceiptProvider>
  );
}

export default Home;
