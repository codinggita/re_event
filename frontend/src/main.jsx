import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { MainDashProvider } from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainDashProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MainDashProvider>
  </React.StrictMode>,
)
