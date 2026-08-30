import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
<ShopContextProvider>
    <App />
    </ShopContextProvider>
  </HashRouter>
)
