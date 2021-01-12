import React, { createContext, useReducer, useContext, useEffect } from 'react';
import ProductClient from 'clients/ProductClient';
import { NotifyUtils } from 'utils';
import { CartReducer } from './CartReducer';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const initialState = { loading: true };
  const [state, dispatch] = useReducer(CartReducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await ProductClient.loadDataCart();
        dispatch({ type: 'FETCH_SUCCESS', payload: response[0] || [] });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    }
    fetchData();
  }, []);

  const increase = async (payload) => {
    const res = await ProductClient.addCartItem(payload);
    if (res.length > 0) {
      dispatch({ type: 'INCREASE', payload: payload.product });
      NotifyUtils.success('Thêm sản phẩm thành công');
    } else {
      NotifyUtils.error(res.message);
    }
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
