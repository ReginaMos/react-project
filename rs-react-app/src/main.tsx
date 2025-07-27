import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router-dom';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element not found');
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename="/react-project/rs-react-app/">
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
