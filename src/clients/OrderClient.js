import { ORDER_API, PRODUCT_API } from 'constants/APIUri';
import { ENUM_ORDER_STATUS, HTTP_STATUS } from 'constants/Enums';
import { GET, POST, OFFSET_DEFAULT, LIMIT_DEFAULT, DELETE } from './Clients';

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
  const skus = orderItems.reduce((accumulator, item) => {
    if (item?.productSku) return [...accumulator, item.productSku];
    return accumulator;
  }, []);

  if (skus.length === 0) {
    return {
      status: HTTP_STATUS.Forbidden,
      message: 'Dữ liệu không đủ',
    };
  }
  const skuListArray = [];
  const LIMIT = 50;
  for (let i = 0; i < skus.length; i += LIMIT) {
    skuListArray.push(skus.slice(i, i + LIMIT));
  }
  const responses = await Promise.all(
    skuListArray.map((skuList) => {
      const body = {
        codes: skuList,
      };
      const params = {
        limit: LIMIT + 1,
      };
      return POST({ url: PRODUCT_API.PRODUCT_LIST, body, params, ctx });
    }),
  );
  const obj = {};
  responses.forEach((response) => {
    response?.data?.forEach((product) => {
      obj[product?.sku] = product;
    });
  });

  return {
    status: HTTP_STATUS.Ok,
    message: 'Lấy thông tin sản phẩm thành công',
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
