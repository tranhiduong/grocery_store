import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import QuantityPicker from './QuantityPicker';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const removeFromCart = (idProduct) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { idProduct } });
  };

  const handleQuantityChange = (idProduct, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(idProduct);
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { idProduct: idProduct, quantity: newQuantity }
      });
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = (e) => {
    if (cart.length === 0) {
      e.preventDefault();
    } else {
      onClose();
      navigate('/checkout');
    }
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 bg-white w-96 shadow-lg flex flex-col`}
    >
      <div className="p-4 flex justify-between items-center border-b relative">
        <h2 className="text-2xl font-semibold">Cart</h2>
        <FaTimes
          className="text-2xl cursor-pointer absolute top-4 right-4"
          onClick={onClose}
        />
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li
                key={item.idProduct}
                className="flex items-center mb-4 border-b pb-4"
              >
                <img
                  src={item.productThumbnail}
                  alt={item.productName}
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.productName}</h3>
                  <p className="text-gray-600 mb-2">${item.productPrice}</p>
                  <div className="flex items-center space-x-2">
                    <QuantityPicker
                      value={item.quantity}
                      onChange={(newQuantity) => handleQuantityChange(item.idProduct, newQuantity)}
                    />
                    <button
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
                      onClick={() => removeFromCart(item.idProduct)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-4 border-t flex justify-between items-center">
        <div>
          <p className="font-semibold">Total Price: ${getTotalPrice().toFixed(2)}</p>
          <p className="text-gray-600">Total Items: {getTotalItems()}</p>
        </div>
        <Link to="/checkout" onClick={handleCheckout}>
          <button
            className="btn btn-primary text-white px-4 py-2 rounded-md"
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
