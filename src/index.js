import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import de App.js
import './index.css'; // Si vous avez un style global pour votre application

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
