import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initTechnologyCompatibility } from './lib/technologyCompatibilityEngine.js';

// Initialize technology compatibility layer on startup
initTechnologyCompatibility();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
