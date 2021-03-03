import { ORDER_API, PRODUCT_API } from 'constants/APIUri';
import { ENUM_ORDER_STATUS, HTTP_STATUS } from 'constants/Enums';
import { GET, POST, isValid, OFFSET_DEFAULT, LIMIT_DEFAULT, DELETE } from './Clients';

async function getOrders({ offset = OFFSET_DEFAULT, limit = LIMIT_DEFAULT, status, ctx }) {
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

export const deleteOrder = async ({ orderNo }) => {
  const url = ORDER_API.ORDER_INFO;
  const params = { orderNo };
  return DELETE({ url, params });
};

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
  const arraySku = orderItems.reduce((accumulator, item) => {
    if (item?.productSku) return [...accumulator, item.productSku];
    return accumulator;
  }, []);

  if (arraySku.length === 0) {
    return {
      status: HTTP_STATUS.Forbidden,
      message: 'Dữ liệu không đủ',
    };
  }
  const body = {
    codes: arraySku,
  };
  const res = await POST({ url: PRODUCT_API.PRODUCT_LIST, body, ctx });

  if (!isValid(res)) {
    return res;
  }

  const obj = {};
  res.data.forEach((product) => {
    obj[product?.sku] = product;
  });

  return {
    status: res.status,
    message: res.message,
    data: [obj],
  };
}
export default {
  getOrders,
  getOrderById,
  getProductByOrderNo,
  getInfoOrderItem,
  deleteOrder,
};
