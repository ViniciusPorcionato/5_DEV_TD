import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RoutesPage } from './Routes/routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesPage />
  </React.StrictMode>
);

