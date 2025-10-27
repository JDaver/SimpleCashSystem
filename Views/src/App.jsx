import { BrowserRouter } from 'react-router-dom';
import AppWrapper from '@components/AppWrapper';
import { ThemeProvider } from '@contexts/Theme';
import { AuthProvider } from './contexts/Auth';
import Toast, { ToastProvider } from './components/Toast/Toast';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppWrapper />
            <Toast.Container />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
