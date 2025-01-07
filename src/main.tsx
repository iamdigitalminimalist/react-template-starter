import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '../axios.interceptors';
import { createBrowserRouter, RouterProvider } from 'react-router';
import routes from './routes';

const router = createBrowserRouter(routes);

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
} else {
  console.error('Root element not found');
}
