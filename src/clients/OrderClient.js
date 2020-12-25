import { CUSTOMER_API } from 'constants/APIUri';
import { GET } from './Clients';

async function getOrderById(id) {
  const result = await GET({ url: `${CUSTOMER_API.ORDER}/${id}`, mock: true });
  return result.data;
}

export default {
  getOrderById,
};
