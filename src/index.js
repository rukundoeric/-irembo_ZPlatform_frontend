import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './components/App';
import { AuthProvider, StateProvider } from './context/Provider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </StateProvider>
    </BrowserRouter>

  </React.StrictMode>
  ,
);
