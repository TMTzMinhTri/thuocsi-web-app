import { ORDER_API, PRODUCT_API } from 'constants/APIUri';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { GET, POST, isValid } from './Clients';

async function getOrders(offset, limit, status, ctx) {
  const url = `${ORDER_API.MY_ORDER_LIST}`;
  const params = {
    offset,
    limit,
    getTotal: true,
  };
  if (status !== ENUM_ORDER_STATUS.ALL) params.status = status;
  const result = await GET({ url, ctx });
  return result;
}

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

async function getInfoOrderItem({orderItems = [], ctx}) {
  const obj = {};
  const arraySku = [];
  orderItems.forEach((item) => {
    arraySku.push(item?.productSKU);
  });
  const body = {
    codes: arraySku,
  };
  const res = await POST({ url: PRODUCT_API.PRODUCT_LIST, body, ctx });
  if (!isValid(res)) {
    return obj;
  }
  const products = res?.data || [];
  products.forEach((product) => {
    obj[product?.sku] = product;
  });
  obj.status = res.status;
  obj.message = res.message;
  return obj;
}
export default {
  getOrders,
  getOrderById,
  getProductByOrderId,
  getInfoOrderItem,
};
