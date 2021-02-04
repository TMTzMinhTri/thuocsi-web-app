import React, { createContext, useReducer, useContext, useEffect } from 'react';
import CartClient from 'clients/CartClient';
import { NotifyUtils } from 'utils';
import { i18n } from 'i18n-lib';
import { isValid } from '../../clients/Clients';
import { CartReducer } from './CartReducer';
import {
  FETCH_SUCCESS,
   FETCH_ERROR,
   ADD_ITEM,
   INCREASE_BY,
   CLEAR,
   CHECKOUT,
} from './CartType';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { t } = i18n.useTranslation('apiErrors');
  const initialState = { loading: true };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const updateCart = async () => {
    try {
      const cart = await CartClient.loadDataCart();
      const infoCart = await CartClient.getInfoCartItem(cart[0].cartItems);
      cart[0].cartItems = infoCart;
      dispatch({ type: FETCH_SUCCESS, payload: cart[0] || [] });
    } catch (error) {
      dispatch({ type: FETCH_ERROR });
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  const updateCartItem = async (payload) => {
    const res = await CartClient.updateCartItem(payload);
    updateCart();
    if (isValid(res)) {
      // TODO @dat.le backup_code
      // dispatch({ type: INCREASE_BY, payload });
      NotifyUtils.success('Đã cập nhật giỏ hàng');
    } else {
      NotifyUtils.error(t(res.errorCode));
    }
    // TODO @dat.le backup_code
    // if (res.errorCode === 'CART_MAXQUANTITY') {
    //   const revertPayload = payload;
    //   revertPayload.q = payload.product.maxQuantity;
    //   CartClient.updateCartItem(revertPayload);
    //   dispatch({ type: INCREASE_BY, payload: revertPayload });
    // }
    return res;
  };

  const increase = async (payload) => {
    const res = await CartClient.updateCartItem(payload);
    updateCart();
    if (isValid(res)) {
      // TODO @dat.le backup_code
      // dispatch({ type: INCREASE, payload: payload.product });
      NotifyUtils.success('Thêm sản phẩm thành công');
    } else {
      NotifyUtils.error(res.message);
    }
  };

  const increaseBy = (payload) => {
    dispatch({ type: INCREASE_BY, payload });
  };

  const decrease = async (payload) => {
    const res = await CartClient.updateCartItem(payload);
    updateCart();
    if (isValid(res)) {
      // TODO @dat.le backup_code
      // dispatch({ type: DECREASE, payload: payload.product });
      NotifyUtils.success('Đã cập nhật giỏ hàng');
      return true;
    }
    NotifyUtils.error(res.message);
    return false;
  };

  const addProduct = (payload) => {
    dispatch({ type: ADD_ITEM, payload });
  };

  const removeCartItem = async (payload) => {
    const res = await CartClient.removeCartItem(payload);
    updateCart();
    if (isValid(res)) {
      // TODO @dat.le backup_code
      // dispatch({ type: REMOVE_ITEM, payload });
      NotifyUtils.success('Xoá sản phẩm thành công');
      return true;
    }
    NotifyUtils.error(res.message);
    return false;
  };

  const clearCart = () => {
    dispatch({ type: CLEAR });
  };

  const handleCheckout = () => {
    dispatch({ type: CHECKOUT });
  };

  const addImportant = async (payload) => {
    const res = await CartClient.updateCartItemImportant({
      sku: payload.sku,
      isImportant: true,
      quantity: payload.quantity,
    });
    updateCart();
    if (!isValid(res)) {
      NotifyUtils.error('Không thể đánh dấu quan trọng');
    } else {
      // TODO @dat.le backup_code
      // dispatch({ type: ADD_IMPORTANT, payload });
      NotifyUtils.success('Đánh dấu quan trọng thành công ');
    }
  };

  const removeImportant = async (payload) => {
    const res = await CartClient.updateCartItemImportant({
      sku: payload.sku,
      isImportant: false,
      quantity: payload.quantity,
    });
    updateCart();
    if (!isValid(res)) {
      NotifyUtils.error('Không thể xoá đánh dấu quan trọng');
    } else {
      // TODO @dat.le backup_code
      // dispatch({ type: REMOVE_IMPORTANT, payload });
      NotifyUtils.success('Xoá đánh dấu quan trọng thành công ');
    }
  };

  const contextValues = {
    removeCartItem,
    addProduct,
    updateCartItem,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    increaseBy,
    addImportant,
    removeImportant,
    updateCart,
    ...state,
  };

  return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
