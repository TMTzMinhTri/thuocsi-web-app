import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import ProductClient from 'clients/ProductClient';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const response = await ProductClient.loadDataCart();
      setData(response.product);
    }
    fetchData();
  }, []);
  if (typeof localStorage !== 'undefined' && data) {
    localStorage.setItem('cartThuocSi', JSON.stringify(data));
  }
  const storage = typeof localStorage !== 'undefined' && localStorage.getItem('cartThuocSi') ? JSON.parse(localStorage.getItem('cartThuocSi')) : [];
  const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (payload) => {
    dispatch({ type: 'INCREASE', payload });
  };

  const increaseBy = (payload) => {
    dispatch({ type: 'INCREASE_BY', payload });
  };

  const decrease = (payload) => {
    dispatch({ type: 'DECREASE', payload });
  };

  const addProduct = (payload) => {
    dispatch({ type: 'ADD_ITEM', payload });
  };

  const removeProduct = (payload) => {
    dispatch({ type: 'REMOVE_ITEM', payload });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const handleCheckout = () => {
    dispatch({ type: 'CHECKOUT' });
  };

  const addImportant = (payload) => {
    dispatch({ type: 'ADD_IMPORTANT', payload });
  };

  const removeImportant = (payload) => {
    dispatch({ type: 'REMOVE_IMPORTANT', payload });
  };

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    increaseBy,
    addImportant,
    removeImportant,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      { children }
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
