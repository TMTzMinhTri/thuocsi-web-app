import { CUSTOMER_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

async function getOrderById(id = '') {
  const url = `${CUSTOMER_API.ORDER}/${id}`;
  const result = await GET({ url, mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

async function getProductByOrderId(id = '') {
  const url = `${CUSTOMER_API.ORDER}/${id}/products`;
  const result = await GET({ url, mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

export default {
  getOrderById,
  getProductByOrderId,
};
