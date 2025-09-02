import axios from 'axios'
import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/checkout/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import { TrackingPage } from './pages/tracking/TrackingPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  
  useEffect(() => 
  {
    axios.get('/api/cart-items?expand=product')
      .then((response) => 
      {
        setCart(response.data);
      });
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} /> {/* index <=> path="/" */}
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
