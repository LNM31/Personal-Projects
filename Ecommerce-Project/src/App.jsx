import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} /> {/* index <=> path="/" */}
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Routes>
    </>
  )
}

export default App
