import React, { useState, useEffect } from 'react';
import { FaCaretDown, FaCaretRight, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Shop = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [sortOption, setSortOption] = useState('default');
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [notification, setNotification] = useState(null); // State for managing notifications
  const { dispatch } = useCart();
  const [currentPage, setCurrentPage] = useState(0); // Tracks the current page
  const [totalProducts, setTotalProducts] = useState(0); 


  const fetchCategories = async () => {
    try {
      const response = await fetch('https://testdeploy.up.railway.app/api/v1/category/?timeRange=2024-06-01T01%3A45%3A45.163Z&timeRange=2024-09-01T01%3A45%3A45.163Z&sort=createdAt&current=0&pageSize=100');
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(
        `https://testdeploy.up.railway.app/api/v1/products?timeRange=2024-06-01T01:45:45.163Z&timeRange=2024-10-01T01:45:45.163Z&sort=createdAt&current=${page}&pageSize=12`
      );
      const data = await response.json();
      setProducts(data.data);
      setTotalProducts(data.total); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await fetch('https://testdeploy.up.railway.app/api/v1/sub/category/?timeRange=2024-06-01T01%3A45%3A45.163Z&timeRange=2024-09-01T01%3A45%3A45.163Z&sort=createdAt&current=0&pageSize=100');
      const data = await response.json();
      setSubCategories(data.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };  

  useEffect(() => { 
    fetchCategories();
    fetchProducts(0);
    fetchSubCategories();
  }, []);

  const toggleCategory = (id) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getProductsToDisplay = () => {
    return selectedSubcategory
      ? products.filter(product => product.idSubCategory === selectedSubcategory)
      : products;
  };

  const sortProducts = (products, option) => {
    switch (option) {
      case 'price-asc':
        return products.sort((a, b) => a.productPrice - b.productPrice);
      case 'price-desc':
        return products.sort((a, b) => b.productPrice - a.productPrice);
      case 'name-asc':
        return products.sort((a, b) => a.productName.localeCompare(b.productName));
      case 'name-desc':
        return products.sort((a, b) => b.productName.localeCompare(a.productName));
      default:
        return products;
    }
  };

  useEffect(() => {
    const productsToDisplay = getProductsToDisplay();
    setSortedProducts(sortProducts([...productsToDisplay], sortOption));
  }, [selectedSubcategory, sortOption, products]);

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: 1 } // Default quantity to 1
    });
    setNotification(`Added "${product.productName}" to Cart`); // Set the notification message
    setTimeout(() => setNotification(null), 2000); // Clear the notification after 3 seconds
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / 12); 

  return (
    <div className="relative flex flex-col md:flex-row mx-auto min-w-[375px] max-w-[1600px]">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Sidebar Toggle Button */}
      <button
        className="md:hidden text-2xl p-4 flex items-center"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars className="mr-2" />
        <span className="text-lg">Categories</span>
      </button>

      {/* Left Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-white w-4/5 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:relative md:translate-x-0 md:w-1/3 lg:w-1/4 p-4 border rounded overflow-auto`}
      >
        <button
          className="md:hidden text-2xl p-4"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Categories</h2>
        <div className="space-y-2">
          {/* "All" Button */}
          <button
            className={`block text-lg mb-1 text-left w-full btn btn-ghost btn-sm justify-start ${
              selectedSubcategory === null ? 'bg-blue-100' : ''
            }`}
            onClick={() => {
              setSelectedSubcategory(null);
              setIsSidebarOpen(false);
            }}
          >
            All
          </button>
          {categories.map((category) => (
            <div key={category.idCategory} className="border-b">
              <button
                className="flex items-center justify-between w-full text-xl font-semibold py-2 pl-4 pr-2 focus:outline-none"
                onClick={() => toggleCategory(category.idCategory)}
              >
                {category.categoryName}
                {subCategories.filter(subCategory => subCategory.idCategory === category.idCategory).length > 0 && (
                  <span className="ml-auto">
                    {expandedCategories[category.idCategory] ? <FaCaretDown /> : <FaCaretRight />}
                  </span>
                )}
              </button>
              {expandedCategories[category.idCategory] && (
                <div className="pl-8 space-y-1">
                  {subCategories
                    .filter(subCategory => subCategory.idCategory === category.idCategory)
                    .map((subcategory) => (
                      <button
                        key={subcategory.idSubCategory}
                        className={`block text-lg mb-1 text-left w-full btn btn-ghost btn-sm justify-start ${
                          selectedSubcategory === subcategory.idSubCategory ? 'bg-blue-100' : ''
                        }`}
                        onClick={() => {
                          setSelectedSubcategory(subcategory.idSubCategory);
                          setIsSidebarOpen(false);
                        }}
                      >
                        {subcategory.subCategoryName}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-3/4 p-4 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold">
              {selectedSubcategory ? subCategories.find(sub => sub.idSubCategory === selectedSubcategory)?.subCategoryName : 'All Products'}
            </h2>
          </div>
          <select
            className="border p-2 rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <div
              key={product.idProduct}
              className="bg-white border rounded p-4 flex flex-col justify-between relative overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={product.productThumbnail}
                alt={product.productName}
                className="w-full h-48 object-contain mb-2"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
                <p className="text-gray-600">{product.productPrice} VND</p>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  className="btn btn-primary text-white px-4 py-2 rounded-md"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <Link to={`/product/${product.idProduct}`}>
                  <button className="btn btn-neutral text-white px-4 py-2 rounded-md">
                    View More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-8">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <div className="mt-2"><span className="text-lg">{currentPage + 1} / {totalPages}</span></div>
          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
