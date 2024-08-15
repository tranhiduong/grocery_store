import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';

const OrderList = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('SHIPPING'); // Default status filter
  const pageSize = 7; // Number of orders per page

  const fetchOrders = async (page = 1) => {
    try {
      const response = await fetch(
        `https://testdeploy.up.railway.app/api/v1/order/by-user/${currentUser.id}?sort=createdAt&current=${page - 1}&pageSize=${pageSize}&statusCodes=${statusFilter}`
      );
      const data = await response.json();
      setOrders(data.data);
      // Calculate total pages based on total number of orders and pageSize
      const totalPages = Math.ceil(data.total / pageSize);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage, currentUser.id, statusFilter]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to the first page when changing status
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SHIPPING':
        return 'bg-blue-500 text-white';
      case 'SUCCEEDED':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };
  const getStatusName = (status) => {
    switch (status) {
      case 'SHIPPING':
        return 'Shipping';
      case 'SUCCEEDED':
        return 'Succeeded';
      default:
        return 'Unknown';
    }
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleStatusChange('SHIPPING')}
          className={`btn ${statusFilter === 'SHIPPING' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Shipping
        </button>
        <button
          onClick={() => handleStatusChange('SUCCEEDED')}
          className={`btn ${statusFilter === 'SUCCEEDED' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Succeeded
        </button>
        <button
          onClick={() => handleStatusChange('')}
          className={`btn ${statusFilter === '' ? 'btn-primary' : 'btn-secondary'}`}
        >
          All
        </button>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Order List</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.idOrder} className="flex justify-between items-center p-4 border rounded">
            <div className="flex-1">
              <p className="mb-1">Order Date: {moment(order.orderDate).format('DD/MM/YYYY')}</p>
              <p className="mb-1">Total: {order.orderTotalPrice} VND</p>
            </div>
            <div className={`p-2 rounded ${getStatusColor(order.statusCode)}`}>
              {getStatusName(order.statusCode)}
            </div>
            <Link to={`/order/${order.idOrder}`} className="flex items-center text-blue-500 ml-4">
              <FaEye className="mr-2" /> View Order
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-secondary"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-secondary"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;
