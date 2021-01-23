import { CUSTOMER_API, ORDER_API } from 'constants/APIUri';
import { GET } from './Clients';

async function getOrderById(ctx, id = '') {
  const url = `${ORDER_API.ORDER_INFO}`;
  const params = {
    order_no: id,
  };
  const result = await GET({ url, params, ctx });
  return result;
}

async function getProductByOrderId(id = '', type) {
  const url = `${CUSTOMER_API.ORDER}/${id}/products?type=${type}`;
  const result = await GET({ url, mock: true });
  return result;
}

export default {
  getOrderById,
  getProductByOrderId,
};
