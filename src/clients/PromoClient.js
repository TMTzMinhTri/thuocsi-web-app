import { GET } from './Clients';

async function getPromos() {
  const url = '/promo-codes';
  const result = await GET({ url, mock: true });
  return result.data;
}

export default {
  getPromos,
};
