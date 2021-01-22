import { ORDER_API, PRODUCT_API } from 'constants/APIUri';
import { GET, POST, isValid } from './Clients';

async function getOrderById(id = '', ctx) {
  const url = `${ORDER_API.ORDER_INFO}`;
  const params = {
    order_no: id,
  };
  const result = await GET({ url, ctx, params });

  return result;
}

async function getProductByOrderId(id = '', ctx) {
  const url = `${ORDER_API.ORDER_ITEM_LIST}`;

  const params = {
    orderNo: id,
  };
  const result = await GET({ url, params, ctx });
  return result;
}

async function getInfoOrderItem(data, ctx) {
  const obj = {};
  const arraySku = [];
  data.forEach((item) => {
    arraySku.push(item.productSKU);
    obj[item.productSKU] = item;
  });
  const body = {
    codes: arraySku,
  };
  const res = await POST({ url: PRODUCT_API.PRODUCT_LIST, body, ctx });
  if (!isValid(res)) {
    return [];
  }
  res.data.forEach((resp) => {
    obj[resp.sku] = { ...obj[resp.sku], ...resp };
  });
  const result = data.map((el) => ({ ...obj[el.productSKU], ...el }));

  return result;
}
export default {
  getOrderById,
  getProductByOrderId,
  getInfoOrderItem,
};
