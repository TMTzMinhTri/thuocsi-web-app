import { ORDER_API } from 'constants/APIUri';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import { GET, OFFSET_DEFAULT, LIMIT_DEFAULT, DELETE } from './Clients';

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

export default {
  getOrders,
  getOrderById,
  getProductByOrderNo,
  deleteOrder,
};
