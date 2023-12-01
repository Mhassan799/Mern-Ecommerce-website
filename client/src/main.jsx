import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './componenets/Context/Auth.jsx'
import { SearchProvider } from './componenets/Context/Search.jsx'
import { CartProvider } from './componenets/Context/Cart.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <CartProvider>
 <AuthProvider>
  <SearchProvider>
    
 <BrowserRouter>
    <App />
  </BrowserRouter>
  </SearchProvider>
  </AuthProvider>
  </CartProvider>  
);
