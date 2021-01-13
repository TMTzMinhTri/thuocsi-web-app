import React, { createContext, useReducer, useContext, useEffect } from 'react';
import CartClient from 'clients/CartClient';
import { NotifyUtils } from 'utils';
import { isValid } from '../../clients/Clients';
import { CartReducer } from './CartReducer';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const initialState = { loading: true };
  const [state, dispatch] = useReducer(CartReducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await CartClient.loadDataCart();
        dispatch({ type: 'FETCH_SUCCESS', payload: response[0] || [] });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    }
    fetchData();
  }, []);

  const updateCartItem = async (payload) => {
    const res = await CartClient.updateCartItem(payload);
    if (isValid(res)) {
      dispatch({ type: 'INCREASE_BY', payload });
      NotifyUtils.success('Đã cập nhật giỏ hàng');
    }
    if (res.errorCode === 'CART_MAXQUANTITY') {
      NotifyUtils.error(res.message);
      const revertPayload = payload;
      revertPayload.q = 10;
      CartClient.updateCartItem(revertPayload);
      dispatch({ type: 'INCREASE_BY', payload: revertPayload });
    }
    return res;
  };

  const increase = async (payload) => {
    const res = await CartClient.updateCartItem(payload);
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

  const decrease = async (payload) => {
    const res = await CartClient.updateCartItem(payload);
    if (res.length > 0) {
      dispatch({ type: 'DECREASE', payload: payload.product });
      NotifyUtils.success('Đã cập nhật giỏ hàng');
      return true;
    }
    NotifyUtils.error(res.message);
    return false;
  };

  const addProduct = (payload) => {
    dispatch({ type: 'ADD_ITEM', payload });
  };

  const removeProduct = async (payload) => {
    const res = await CartClient.removeCartItem(payload);
    if (res.length > 0) {
      dispatch({ type: 'REMOVE_ITEM', payload });
      NotifyUtils.success('Xoá sản phẩm thành công');
      return true;
    }
    NotifyUtils.error(res.message);
    return false;
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
    updateCartItem,
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
