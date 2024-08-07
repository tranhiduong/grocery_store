import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch, FaSignOutAlt, FaCaretDown, FaCaretRight } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Cart from '../components/Cart';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cart } = useCart();
  const { currentUser, signOut } = useAuth();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories and subcategories
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://sugartran.000webhostapp.com/api/CategoriesResponse.json');
        const data = await response.json();
        setCategories(data.data);
        setSelectedCategory(data.data[0]); // Set default selected category
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await fetch('https://sugartran.000webhostapp.com/api/SubCategoriesResponse.json');
        const data = await response.json();
        setSubCategories(data.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  const getSubCategoriesForSelectedCategory = () => {
    if (!selectedCategory) return [];
    return subCategories.filter(subCategory => subCategory.idCategory === selectedCategory.idCategory);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSubCategoryClick = (subcategory) => {
    navigate(`/shop?subcategoryId=${subcategory.idSubCategory}`);
  };

  const handleAllClick = () => {
    navigate('/shop');
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="text-white p-4 flex justify-between items-center mx-auto min-w-[375px] max-w-[1600px]">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
          </div>
          <div className="flex items-center w-full md:w-3/5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 pl-3 pr-10 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div
              className="flex items-center relative text-white cursor-pointer mr-4"
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingCart className="text-2xl" />
              <div className="absolute -top-2 -left-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                <span>{cartItemCount}</span>
              </div>
              <span className="ml-1 text-sm">Cart</span>
            </div>
            {currentUser ? (
              <>
                <Link to="/account" className="flex items-center text-white cursor-pointer mr-4">
                  <FaUser className="text-2xl" />
                  <span className="ml-1 text-sm">Account</span>
                </Link>
                <div className="flex items-center text-white cursor-pointer" onClick={handleSignOut}>
                  <FaSignOutAlt className="text-2xl" />
                  <span className="ml-1 text-sm">Sign Out</span>
                </div>
              </>
            ) : (
              <Link to="/signin" className="flex items-center mr-4 text-white">
                <FaUser className="text-2xl" />
                <span className="ml-1 text-sm">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="relative bg-white border-t border-gray-200">
        <div className="mx-auto min-w-[375px] max-w-[1600px] flex items-start p-4 h-20">
          <div className="relative">
            <Link to="/shop">
              <button
                className="btn btn-primary text-white px-4 py-2 rounded-md"
              >
                Shop
              </button>
            </Link>
            
          </div>
        </div>
      </div>

      {isCartOpen && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;
