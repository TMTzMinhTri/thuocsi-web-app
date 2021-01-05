import { CUSTOMER_API } from 'constants/APIUri';
import { GET } from './Clients';

async function getOrderById(id = '') {
  const url = `${CUSTOMER_API.ORDER}/${id}`;
  const result = await GET({ url, mock: true });
  return result.data;
}

export default {
  getOrderById,
};
