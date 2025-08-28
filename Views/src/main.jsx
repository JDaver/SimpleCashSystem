import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
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
