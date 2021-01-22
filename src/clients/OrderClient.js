import { ORDER_API, PRODUCT_API } from 'constants/APIUri';
import { GET, POST, isValid } from './Clients';

async function getOrderById(id = '', ctx) {
  const url = `${ORDER_API.ORDER_API_PREFIX}/order?order_no=${id}`;
  const result = await GET({ url, ctx });

  return result;
}

async function getProductByOrderId(id = '', ctx) {
  const url = `${ORDER_API.ORDER_ITEM_LIST}?orderNo=${id}`;
  const result = await GET({ url, ctx });
  return result;
}

async function getInfoOrderItem(data, ctx) {
  const arraySku = [];
  data.forEach((item) => {
    arraySku.push(item.productSKU);
  });
  const body = {
    codes: arraySku,
  };
  const res = await POST({ url: PRODUCT_API.PRODUCT_LIST, body, ctx });
  if (!isValid(res)) {
    return [];
  }
  const result = data.map((el, index) => ({ ...el, ...res.data[index] }));

  return result;
}
export default {
  getOrderById,
  getProductByOrderId,
  getInfoOrderItem,
};
