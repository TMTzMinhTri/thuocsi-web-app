import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { NotifyUtils } from 'utils';
import { PromoService, CartService } from 'services';
import { isValid, CartClient, getFirst, isValidWithoutData } from 'clients';
import { capitalizeText } from 'utils/StringUtils';
import { CartReducer } from './CartReducer';

import { FETCH_SUCCESS, FETCH_ERROR, ADD_ITEM, INCREASE_BY, CLEAR, CHECKOUT } from './CartType';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const initialState = { loading: true };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const getPromoInfo = useCallback(async ({ voucherCode }) => {
    if (!voucherCode) {
      return null;
    }
    const promoData = await PromoService.getPromotionDetailByVoucherCode({ voucherCode });
    return promoData;
  });

  // reload cart
  const reloadDataCart = async ({ cartRes, successMessage, errorMessage }) => {
    try {
      if (!isValidWithoutData(cartRes)) {
        if (cartRes && cartRes.message) {
          NotifyUtils.error(cartRes.message);
        } else if (errorMessage) {
          NotifyUtils.error(errorMessage);
        }
        return;
      }
      if (successMessage) NotifyUtils.success(successMessage);

      const cartData = getFirst(cartRes);
      const { cartItems, redeemCode = [] } = cartData;
      const [cartItemsInfo, promoInfo] = await Promise.all([
        CartService.getInfoCartItem(cartItems),
        getPromoInfo({ voucherCode: redeemCode[0] }),
      ]);

      cartData.cartItems = cartItemsInfo;
      cartData.promoInfo = promoInfo;
      dispatch({ type: FETCH_SUCCESS, payload: cartData || [] });
    } catch (error) {
      NotifyUtils.error(error.message || 'Tải giỏ hàng thất bại');
      dispatch({ type: FETCH_ERROR });
    }
  };

  const updateCart = useCallback(async () => {
    const cartRes = await CartClient.loadDataCart();
    if (!isValid(cartRes)) {
      dispatch({ type: FETCH_ERROR });
      return;
    }
    reloadDataCart({ cartRes });
  }, []);

  useEffect(() => {
    async function fetchData() {
      await updateCart();
    }
    fetchData();
  }, [updateCart]);

  const updateCartItem = async (payload) => {
    const cartRes = await CartClient.updateCartItem(payload);
    if (!isValid(cartRes) && cartRes.errorCode === 'CART_MAX_QUANTITY') {
      const revertPayload = payload;
      // get quanity can add from response and compare with maxQuantity
      const { quantity = revertPayload.product.maxQuantity } = getFirst(cartRes, {});
      revertPayload.q = quantity;
      const res = await CartClient.updateCartItem(revertPayload);
      dispatch({ type: INCREASE_BY, payload: revertPayload });
      reloadDataCart({
        res,
        // errorMessage: res.message || 'Số lượng đặt hàng vượt quá giới hạn',
        successMessage: `Đã cập nhật ${capitalizeText(
          payload.product.name,
        )}  số lượng tối đa có thể đặt`,
      });
    } else
      reloadDataCart({
        cartRes,
        successMessage: `Đã cập nhật ${capitalizeText(payload.product.name)} thành công`,
        errorMessage: 'Cập nhập sản phẩm thất bại',
      });

    return cartRes;
  };

  const increase = async (payload) => {
    const cartRes = await CartClient.updateCartItem(payload);
    reloadDataCart({
      cartRes,
      successMessage: 'Thêm sản phẩm thành công',
      errorMessage: 'Cập nhập sản phẩm thất bại',
    });
  };

  const increaseBy = (payload) => {
    dispatch({ type: INCREASE_BY, payload });
  };

  const decrease = async (payload) => {
    const cartRes = await CartClient.updateCartItem(payload);
    reloadDataCart({
      cartRes,
      successMessage: 'Đã cập nhật giỏ hàng,',
      errorMessage: 'Cập nhập sản phẩm thất bại',
    });
  };

  const addProduct = (payload) => {
    dispatch({ type: ADD_ITEM, payload });
  };

  const removeCartItem = async (payload) => {
    const cartRes = await CartClient.removeCartItem(payload);
    reloadDataCart({
      cartRes,
      successMessage: `Sản phẩm ${capitalizeText(payload.name)} đã được xóa ra khỏi giỏ hàng`,
      errorMessage: 'Xoá sản phẩm thất bại',
    });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR });
  };

  const handleCheckout = () => {
    dispatch({ type: CHECKOUT });
  };

  const addImportant = async (payload) => {
    const cartRes = await CartClient.updateCartItemImportant({
      sku: payload.sku,
      isImportant: true,
      quantity: payload.quantity,
    });
    updateCart({
      cartRes,
      successMessage: 'Đánh dấu quan trọng thành công ',
      errorMessage: 'Đánh dấu quan trọng sản phẩm thất bại',
    });
  };

  const removeImportant = async (payload) => {
    const cartRes = await CartClient.updateCartItemImportant({
      sku: payload.sku,
      isImportant: false,
      quantity: payload.quantity,
    });
    updateCart({
      cartRes,
      successMessage: 'Xoá đánh dấu quan trọng thành công',
      errorMessage: 'Xoá đánh dấu quan trọng thất bại',
    });
  };

  const updateDeliveryMethod = async ({
    deliveryMethod,
    customerDistrictCode,
    customerProvinceCode,
    customerWardCode,
    customerShippingAddress,
  }) => {
    const res = await CartClient.updateDeliveryMethod({
      deliveryMethod,
      customerDistrictCode,
      customerProvinceCode,
      customerWardCode,
      customerShippingAddress,
    });
    if (!isValid(res)) {
      NotifyUtils.error(res?.message || 'Cập nhật phương thức giao hàng thất bại ');
      return;
    }
    NotifyUtils.success('Cập nhật phương thức giao hàng thành công');
    updateCart();
  };

  const updatePaymentMethod = async ({
    paymentMethod,
    customerDistrictCode,
    customerProvinceCode,
    customerWardCode,
  }) => {
    const res = await CartClient.updatePaymentMethod({
      paymentMethod,
      customerDistrictCode,
      customerProvinceCode,
      customerWardCode,
    });
    if (!isValid(res)) {
      NotifyUtils.error(res.message || 'Cập nhật phương thức thanh toán thất bại ');
      return;
    }
    NotifyUtils.success('Cập nhật phương thức thanh toán thành công');
    updateCart();
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
    updateDeliveryMethod,
    updatePaymentMethod,
    ...state,
  };

  return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
