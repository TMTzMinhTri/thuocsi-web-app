import { GET, isValid } from './Clients';

async function getPromos() {
  const url = '/promo-codes';
  const result = await GET({ url, mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

async function getOtherPromos() {
  const url = '/promo-codes/other';
  const result = await GET({ url, mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

export default {
  getPromos,
  getOtherPromos,
};
