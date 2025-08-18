import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './components/AppWrapper/AppWrapper';
import { ThemeProvider } from './contexts/ThemeProvider';

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
