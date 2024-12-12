import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import PlayGroundPage from './pages/PlayGroundPage.tsx';
import Providers from './providers';
import '../axios.interceptors';
import TechStackPage from './pages/TechStackPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="playground" element={<PlayGroundPage />} />
          <Route path="techstack" element={<TechStackPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>,
);
