import { ORDER_API, PRODUCT_API } from 'constants/APIUri';
import { ENUM_ORDER_STATUS, HTTP_STATUS } from 'constants/Enums';
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

async function getOrderById({ ctx, id = 0 }) {
  const url = ORDER_API.ORDER_INFO;
  const params = {
    orderId: id,
  };
  const result = await GET({ url, ctx, params });

  return result;
}

async function getProductByOrderNo({ orderNo = '', ctx }) {
  const url = `${ORDER_API.ORDER_ITEM_LIST}`;

  const params = {
    orderNo,
  };
  const result = await GET({ url, params, ctx });
  return result;
}

async function getInfoOrderItem({ orderItems = [], ctx }) {
  const obj = {};
  const set = new Set();
  const arraySku = orderItems.map((item) => {
    set.add(item?.productSku);
    return item?.productSku;
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

  const sizeOfobj = Object.keys(obj).length;
  if (sizeOfobj !== set.size) {
    obj.status = HTTP_STATUS.Forbidden;
    obj.message = 'Dữ liệu trả về không đủ';
  } else {
    obj.status = res.status;
    obj.message = res.message;
  }

  return obj;
}
export default {
  getOrders,
  getOrderById,
  getProductByOrderNo,
  getInfoOrderItem,
};
