import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Cart from '../components/Cart';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const { currentUser, signOut } = useAuth();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="text-white p-4 flex justify-between items-center mx-auto min-w-[375px] max-w-[1600px]">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold">MyStore</span>
          </div>
          <div className="flex items-center justify-center w-3/5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 pl-3 pr-10 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </div>
          <div className="flex items-center">           
            <div
              className="flex items-center relative text-white cursor-pointer mr-2"
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingCart className="text-2xl" />
              <div className="absolute -top-2 -left-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                <span>
                  {cartItemCount}
                </span>
              </div>
              <span className="ml-1 text-sm">Cart</span>
            </div>
            {currentUser ? (
              <div className="flex items-center relative text-white cursor-pointer">
                <FaUser className="text-2xl" />
                <span className="ml-1 text-sm" onClick={handleSignOut}>Sign Out</span>
              </div>
            ) : (
              <Link to="/signin" className="flex items-center mr-4 text-white">
                <FaUser className="text-2xl" />
                <span className="ml-1 text-sm">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
