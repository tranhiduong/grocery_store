// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Shop from './pages/Shop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import OrderDetail from './pages/OrderDetail';

import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <script src="https://js.stripe.com/v3/"></script>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <div className='min-h-[calc(100vh-72px-1.5rem)]'>
            <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/account" element={<Account />} />
                <Route path="/order/:orderId" element={<OrderDetail />} />
              </Routes>
            </div> 
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </div>
  );
}

export default App;
