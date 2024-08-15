import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  }

  const shippingFee = 10000; // Example shipping fee
  const totalPriceWithShipping = getTotalPrice() + shippingFee;

  const [formData, setFormData] = useState({
    idUser: 0,
    statusCode: '',
    statusName: '',
    orderName: '',
    orderEmail: '',
    orderPhoneNumber: '',
    orderAddress: '',
    orderNote: '',
    orderDate: new Date().toISOString(),
    orderTotalPrice: totalPriceWithShipping,
    orderShippingMethod: 'GHN',
    orderShippingDate: new Date().toISOString(),
    orderTrackingNumber: '',
    orderPaymentMethod: 'Cash',
    orderPaymentStatus: 'AwaitingPayment',
  });

  useEffect(()=>{
    if(currentUser){
      setFormData({
        idUser: currentUser.id,
        statusCode: 'SHIPPING',
        statusName: 'Đang giao hàng',
        orderName: currentUser.fullName,
        orderEmail: '',
        orderPhoneNumber: currentUser.phone,
        orderAddress: currentUser.address,
        orderNote: '',
        orderDate: new Date().toISOString(),
        orderTotalPrice: totalPriceWithShipping,
        orderShippingMethod: 'GHN',
        orderShippingDate: new Date().toISOString(),
        orderTrackingNumber: '',
        orderPaymentMethod: 'Cash',
        orderPaymentStatus: 'AwaitingPayment',
      });
    }
  },[currentUser]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formData };
    console.log('Payload:', payload);

    try {
      const response = await fetch('https://testdeploy.up.railway.app/api/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setIsOrderSuccess(false);
        setIsModalOpen(true);
      }else{
        setIsOrderSuccess(true);
        setIsModalOpen(true);
        const result = await response.json();
        const orderId = result.data.idOrder;
        cart.forEach(async (item) =>  {
          const payloadOrderDetail = { 
            "idOrder": orderId,
            "idProduct": item.idProduct,
            "statusCode": "",
            "statusName": "",
            "orderDetailQuantity": item.quantity,
            "orderDetailPrice": item.productPrice,
            "orderDetailTotalPrice": item.quantity * item.productPrice,
            "orderDetailColor": ""
           };
          try {
            const response = await fetch('https://testdeploy.up.railway.app/api/v1/order/detail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payloadOrderDetail),
            });
            if (!response.ok) {
              const resultOrderDetail = await response.json();
              console.log("Save Detail Failed:", resultOrderDetail.message);
            }
          }catch(error){
            console.log("Save Detail Failed:", error);
          }
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setIsOrderSuccess(false);
      setIsModalOpen(true);
    }

    
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (isOrderSuccess) {
      navigate('/shop');
      clearCart();
    }
  };

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
          {/* Form fields */}
          <div>
            <label className="block text-gray-700">Name*</label>
            <input
              type="text"
              name="orderName"
              value={formData.orderName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address*</label>
            <input
              type="text"
              name="orderAddress"
              value={formData.orderAddress}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone*</label>
            <input
              type="tel"
              name="orderPhoneNumber"
              value={formData.orderPhoneNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email*</label>
            <input
              type="email"
              name="orderEmail"
              value={formData.orderEmail}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Note</label>
            <input
              type="text"
              name="orderNote"
              value={formData.orderNote}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Shipping Method</label>
            <select
              name="orderShippingMethod"
              value={formData.orderShippingMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="GHN">GHN</option>
              <option value="GHTK">GHTK</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              name="orderPaymentMethod"
              value={formData.orderPaymentMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="CreditCard">Credit Card</option>
              <option value="Cash">Cash</option>
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
                  {item.productPrice} VND x {item.quantity}
                </p>
              </div>
              <img
                src={item.productThumbnail}
                alt={item.productName}
                onError={(e) => e.target.src = '/no-image.jpg'}
                className="w-24 h-24 object-cover"
              />
            </li>
          ))}
        </ul>
        <div className="border-t mt-4 pt-4">
          <p className="text-lg">
            <span className="font-semibold">Subtotal:</span> {getTotalPrice()} VND
          </p>
          <p className="text-lg">
            <span className="font-semibold">Shipping Fee:</span> {shippingFee} VND
          </p>
          <p className="text-xl font-semibold mt-2">
            <span>Total:</span> {totalPriceWithShipping} VND
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="font-bold text-lg">
              {isOrderSuccess ? 'Order Success' : 'Order Failed'}
            </h3>
            <p className="py-4">
              {isOrderSuccess
                ? 'Your order has been placed successfully!'
                : 'There was an error placing your order. Please try again.'}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="btn btn-primary px-4 py-2 rounded-md text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
