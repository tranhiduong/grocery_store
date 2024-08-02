import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuantityPicker from '../components/QuantityPicker';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://sugartran.000webhostapp.com/api/ProductResponse.json');
        const data = await response.json();
        setProduct(data.data.find((p) => p.idProduct === parseInt(productId)));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };


    fetchProducts();
  }, []);


  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: quantity } // Default quantity to 1
    });
    setNotification(`Added "${product.productName}" to Cart`); // Set the notification message
    setTimeout(() => setNotification(null), 2000); // Clear the notification after 3 seconds
  };

  return (
    <div className='mx-auto min-w-[375px] max-w-[1600px]'>
      {notification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {notification}
          </div>
        )}
      <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2 p-4">
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src={product.productThumbnail}
              alt={product.productName}
              className="w-full h-full object-cover rounded transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col space-y-4 bg-white border rounded shadow-md">
          <h1 className="text-3xl font-semibold border-b pb-2">{product.productName}</h1>
          <p className="text-2xl text-gray-800 border-b pb-2">${product.productPrice}</p>
          <p className="text-gray-600">{product.productDescription}</p>
          <div className="flex items-center space-x-4">
            <span className="text-xl">Quantity:</span>
            <QuantityPicker value={quantity} onChange={setQuantity} />
          </div>
          <button
            className="btn btn-primary mt-4 w-full py-2 text-xl text-white"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <Link to="/shop" className="btn btn-outline btn-neutral mt-2 w-full py-2 text-xl">
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default ProductDetail;
