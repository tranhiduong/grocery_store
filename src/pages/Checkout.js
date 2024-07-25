import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'creditCard'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  const shippingFee = 10; // Example shipping fee
  const totalPriceWithShipping = getTotalPrice() + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto min-w-[375px] max-w-[1600px] h-screen">
        <p className="text-2xl mb-4">There's no item in your cart.</p>
        <Link to="/shop">
          <button className="btn btn-primary px-4 py-2 rounded-md text-white">Go to Shop</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mx-auto min-w-[375px] max-w-[1600px] md:max-h-[calc(100vh-72px-1.5rem)]">
      {/* Left Side: User Information Form */}
      <div className="w-full md:w-1/2 p-8 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>
          <div className="flex justify-between">
            <Link to="/shop" className="btn btn-neutral px-4 py-2 rounded-md text-white">
              Go To Shop
            </Link>
            <button type="submit" className="btn btn-primary px-4 py-2 rounded-md text-white">
              Place Order
            </button>
          </div>
        </form>
      </div>

      {/* Right Side: Cart Summary */}
      <div className="w-full md:w-1/2 p-8 flex-grow overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        <ul className="space-y-4 max-h-[400px] overflow-y-auto">
          {cart.map((item) => (
            <li key={item.idProduct} className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.productName}</h3>
                <p className="text-gray-600">
                  ${item.productPrice} x {item.quantity}
                </p>
              </div>
              <img
                src={item.productThumbnail}
                alt={item.productName}
                className="w-24 h-24 object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="border-t mt-4 pt-4">
          <p className="text-lg">
            <span className="font-semibold">Subtotal:</span> ${getTotalPrice().toFixed(2)}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Shipping Fee:</span> ${shippingFee.toFixed(2)}
          </p>
          <p className="text-xl font-semibold mt-2">
            <span>Total:</span> ${totalPriceWithShipping.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
