import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(`https://testdeploy.up.railway.app/api/v1/order/${orderId}`);
        const result = await response.json();

        if (result.code === 200) {
          const apiOrder = result.data;
          setOrder({
            id: apiOrder.idOrder,
            date: apiOrder.orderDate,
            status: apiOrder.statusCode,
            name: apiOrder.orderName,
            email: apiOrder.orderEmail,
            phoneNumber: apiOrder.orderPhoneNumber,
            address: apiOrder.orderAddress,
            note: apiOrder.orderNote,
            shippingMethod: apiOrder.orderShippingMethod,
            paymentMethod: apiOrder.orderPaymentMethod,
            totalPrice: apiOrder.orderTotalPrice
          });
        } else {
          setError('Failed to fetch order details.');
        }
      } catch (error) {
        setError('An error occurred while fetching order details.');
      }
    };

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://testdeploy.up.railway.app/api/v1/order/detail/by-order/${orderId}?sort=createdAt&current=0&pageSize=100`);
        const result = await response.json();

        if (result.success) {
          setOrderDetails(result.data);
        } else {
          setError('Failed to fetch order details.');
        }
      } catch (error) {
        setError('An error occurred while fetching order details.');
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchOrderData(), fetchOrderDetails()]);
      setLoading(false);
    };

    fetchData();
  }, [orderId]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>No order found.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row mx-auto min-w-[375px] max-w-[1600px] md:max-h-[calc(100vh-72px-1.5rem)]">
      {/* Left Side: Order Details */}
      <div className="w-full md:w-1/2 p-8 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Order Details</h2>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Order ID:</p>
            <p className="text-gray-700 w-2/3">{order.id}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Order Date:</p>
            <p className="text-gray-700 w-2/3">{moment(order.date).format('DD/MM/YYYY')}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Status:</p>
            <p className="text-gray-700 w-2/3">{getStatusName(order.status)}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Order Name:</p>
            <p className="text-gray-700 w-2/3">{order.name}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Order Email:</p>
            <p className="text-gray-700 w-2/3">{order.email}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Order Phone Number:</p>
            <p className="text-gray-700 w-2/3">{order.phoneNumber}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Order Address:</p>
            <p className="text-gray-700 w-2/3">{order.address}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Order Note:</p>
            <p className="text-gray-700 w-2/3">{order.note || 'N/A'}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Shipping Method:</p>
            <p className="text-gray-700 w-2/3">{order.shippingMethod}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-lg font-semibold w-1/3">Payment Method:</p>
            <p className="text-gray-700 w-2/3">{order.paymentMethod}</p>
          </div>
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
          {orderDetails.map((item) => (
            <li key={item.idOrderDetail} className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Product ID: {item.idProduct}</h3>
                <p className="text-gray-600">
                  {item.orderDetailPrice} VND x {item.orderDetailQuantity}
                </p>
              </div>
              <p className="text-gray-700">{item.orderDetailTotalPrice} VND</p>
            </li>
          ))}
        </ul>
        <div className="border-t mt-4 pt-4">
          <p className="text-xl font-semibold mt-2">
            <span>Total:</span> {order.totalPrice} VND
          </p>
        </div>     
      </div>
    </div>
  );
};

export default OrderDetail;
