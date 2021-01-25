import { PAGE_SIZE } from 'constants/data';
import { GetQuantityProductFromCart } from 'utils';
import CartClient from './CartClient';

import { GET, isValid } from './Clients';

async function searchKeywords(keyword) {
  const url = `/marketplace/product/v1/search?q=${keyword}`;
  const res = await GET({ url });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function searchProducts(keyword, page) {
  const url = '/marketplace/product/v1/products/list';
  const params = {
    page,
    q: keyword,
    limit: PAGE_SIZE,
    getTotal: true,
  };
  const res = await GET({ url, params });

  console.log(res);
  if (!isValid(res)) {
    return [];
  }
  let cart = {};
  let productListWithQuantityInCart = {};
  try {
    cart = await CartClient.loadDataCart();
  } catch (error) {
    cart.status = 'ERROR';
  }
  const cartObject = {};
  // eslint-disable-next-line no-restricted-syntax
  if (cart && cart[0] && cart[0].cartItems && cart[0].cartItems.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart[0].cartItems) {
      cartObject[item.sku] = item;
    }
    productListWithQuantityInCart = GetQuantityProductFromCart.GetQuantity(res, cartObject);
  } else {
    productListWithQuantityInCart = res.data || [];
  }

  return productListWithQuantityInCart;
}

export default {
  searchKeywords,
  searchProducts,
};
