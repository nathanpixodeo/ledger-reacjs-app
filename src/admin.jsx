import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from './apps/AdminApp';
import './styles/global.css';

async function bootstrap() {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('[MSW] Mock Service Worker started');
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AdminApp />
    </React.StrictMode>
  );
}

bootstrap();
