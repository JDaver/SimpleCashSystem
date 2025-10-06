import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './index.css';
import App from './App.jsx';

const queryclient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
    <App />
    </QueryClientProvider>
  </StrictMode>
);

const loader = document.getElementById('initial-loader');
if (loader) {
  requestAnimationFrame(() => {
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';

    setTimeout(() => {
      loader.remove();
    }, 300);
  });
}
