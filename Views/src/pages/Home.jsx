import { useMemo } from 'react';
import { loadThemedComponent } from '@utils/LoadThemedComponent';
import { useTheme } from '@contexts/useTheme';
import Receipt from '@components/Receipt';

function Home() {

const { theme } = useTheme();
  const CashierScreen = useMemo(() => loadThemedComponent(theme, 'CashierScreen'), [theme]);
  return (
    <>
      <CashierScreen />
      <Receipt />
    </>
  );
}

export default Home;
