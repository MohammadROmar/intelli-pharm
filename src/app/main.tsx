import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import {
  initializeDeploymentProtection,
  recoverFromVitePreloadError,
} from '@/shared/lib';

import './styles/index.css';

initializeDeploymentProtection();

window.addEventListener('vite:preloadError', (event) => {
  if (import.meta.env.DEV) {
    console.warn('[vite:preloadError]', event.payload);
  }

  void recoverFromVitePreloadError();
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Unable to mount the application: #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
