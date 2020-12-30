import { CUSTOMER_API } from 'constants/APIUri';
import { GET } from './Clients';

async function getOrder({ status }) {
  const url = CUSTOMER_API.ORDER + (status && status.length > 0 ? `?status=${status}` : '');
  const result = await GET({ url, mock: true });
  return result;
}

async function getReferral() {
  const result = await GET({ url: CUSTOMER_API.REFERRAL, mock: true });
  return result.data;
}

export async function getWallet() {
  const result = await GET({ url: CUSTOMER_API.WALLET, mock: true });
  return result;
}

export async function getPromo() {
  const result = await GET({ url: CUSTOMER_API.PROMO, mock: true });
  return result.data;
}

export default {
  getOrder,
  getReferral,
  getWallet,
  getPromo,
};
