import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import { AuthProvider } from './context/AuthProvider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>
  ,
);
