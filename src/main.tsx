import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import PlayGroundPage from './pages/PlayGroundPage.tsx';
import { Toaster } from './components/ui/toaster.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="playground" element={<PlayGroundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
