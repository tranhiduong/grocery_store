import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetail = () => {
  // Example data
  const order = {
    id: '12345',
    date: '2024-08-05',
    status: 'Shipped',
    items: [
      {
        id: '1',
        name: 'Product 1',
        price: 29.99,
        quantity: 2,
        thumbnail: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818'
      },
      {
        id: '2',
        name: 'Product 2',
        price: 49.99,
        quantity: 1,
        thumbnail: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818'
      }
    ],
    shippingFee: 10.00,
  };

  // Calculate total price
  const getTotalPrice = () => {
    return order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPriceWithShipping = getTotalPrice() + order.shippingFee;

  return (
    <div className="flex flex-col md:flex-row mx-auto min-w-[375px] max-w-[1600px] md:max-h-[calc(100vh-72px-1.5rem)]">
      {/* Left Side: Order Details */}
      <div className="w-full md:w-1/2 p-8 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
        <div className="mb-4">
          <p className="text-lg font-semibold">Order ID:</p>
          <p className="text-gray-700">{order.id}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Order Date:</p>
          <p className="text-gray-700">{order.date}</p>
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Status:</p>
          <p className="text-gray-700">{order.status}</p>
        </div>
        <div className="mt-6 relative bottom-0">
          <Link to="/account" className="btn btn-neutral px-4 py-2 rounded-md text-white">
            Back to Account
          </Link>
        </div>
      </div>

      {/* Right Side: Order Summary */}
      <div className="w-full md:w-1/2 p-8 flex-grow overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        <ul className="space-y-4 max-h-[400px] overflow-y-auto">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity}
                </p>
              </div>
              <img
                src={item.thumbnail}
                alt={item.name}
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
            <span className="font-semibold">Shipping Fee:</span> ${order.shippingFee.toFixed(2)}
          </p>
          <p className="text-xl font-semibold mt-2">
            <span>Total:</span> ${totalPriceWithShipping.toFixed(2)}
          </p>
        </div>     
      </div>
    </div>
  );
};

export default OrderDetail;
