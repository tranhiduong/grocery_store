import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';


const OrderList = () => {
  const { currentUser } = useAuth();
  const [ orders, setOrders ] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`https://testdeploy.up.railway.app/api/v1/order/by-user/${currentUser.id}`);
      const data = await response.json();
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }; 

  useEffect(() => { 
    fetchOrders();
  }); 

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order List</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li className="flex justify-between items-center p-4 border rounded">
            <div>
              <p>Order Date: {moment(order.orderDate).format('DD/MM/YYYY')}</p>
              <p>Total: ${order.orderTotalPrice}</p>
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
