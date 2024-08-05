import React from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const orders = [
  { id: 1, date: '2023-08-01', total: 50.0 },
  { id: 2, date: '2023-07-20', total: 30.0 },
];

const OrderList = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order List</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="flex justify-between items-center p-4 border rounded">
            <div>
              <p>Order Date: {order.date}</p>
              <p>Total: ${order.total}</p>
            </div>
            <Link to={`/order/${order.id}`} className="flex items-center text-blue-500">
              <FaEye className="mr-2" /> View Order
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
