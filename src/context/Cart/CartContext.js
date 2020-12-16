import React, { createContext, useReducer, useContext } from 'react';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext();

const storage = typeof localStorage !== 'undefined' && localStorage.getItem('cartThuocSi') ? JSON.parse(localStorage.getItem('cartThuocSi')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

export const CartContextProvider = ({ children }) => {
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

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    increaseBy,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      { children }
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
