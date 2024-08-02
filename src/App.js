// src/App.js

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home';
import Shop from './pages/Shop';
import Navbar from './components/Navbar';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ManageAccount from './pages/ManageAccount';

import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <div className="pages mt-6">
              <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/manage-account" element={<ManageAccount />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </div>
  );
}

export default App;
