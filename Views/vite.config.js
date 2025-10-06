import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, 'src/Hooks'),
      '@themes': path.resolve(__dirname, 'src/themes'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@reducers': path.resolve(__dirname, 'src/reducers'),
    },
  },
});
