import { BrowserRouter } from 'react-router-dom';
import AppWrapper from '@components/AppWrapper';
import { ThemeProvider } from '@contexts/Theme';
import { AuthProvider } from './contexts/Auth';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppWrapper />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
