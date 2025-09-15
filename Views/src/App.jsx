import { BrowserRouter } from 'react-router-dom';
import AppWrapper from '@components/AppWrapper';
import { ThemeProvider } from '@contexts/Theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppWrapper />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
