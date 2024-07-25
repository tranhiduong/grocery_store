import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home';
import Shop from './pages/Shop';
import Navbar from './components/Navbar';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

import { CartProvider } from './contexts/CartContext';

function App() {
  return (
      <div className="App">
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <div className="pages mt-6">
              <Routes>
                <Route 
                  path="/"
                  element={<Home />}
                />
                <Route 
                  path="/shop"
                  element={<Shop />}
                />
                <Route 
                  path="/product/:productId"
                  element={<ProductDetail />}
                />
                <Route 
                  path="/checkout"
                  element={<Checkout />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </CartProvider>
      </div>
);
}

export default App;
