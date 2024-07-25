import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const existingItemIndex = state.findIndex(item => item.idProduct === action.payload.idProduct);
        if (existingItemIndex >= 0) {
          // Item already in cart, increase quantity
          return state.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
        } else {
          // New item, add to cart
          return [...state, action.payload];
        }
      }
      case 'REMOVE_ITEM':
        return state.filter(item => item.idProduct !== action.payload.idProduct);
      case 'UPDATE_QUANTITY':
        return state.map(item =>
          item.idProduct === action.payload.idProduct
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      case 'LOAD_CART':
        return action.payload;
      default:
        return state;
    }
};
  


export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
