import { CUSTOMER_API } from 'constants/APIUri';
import { GET, PUT, isValid, POST } from './Clients';

const retrySendSms = ({ code }) => {
  const url = CUSTOMER_API.RETRY_SEND_SMS;
  return POST({ url, body: { code } });
};
const sendSms = ({ phoneNumber }) => {
  const url = CUSTOMER_API.SEND_SMS;
  return POST({ url, body: { phone: phoneNumber } });
};

async function getOrder({ status }) {
  const url = CUSTOMER_API.ORDER + (status && status.length > 0 ? `?status=${status}` : '');
  const result = await GET({ url, mock: true });
  return result;
}

async function getReferral({ params }) {
  return GET({ url: CUSTOMER_API.REFERRAL, params });
}

export async function getWallet() {
  const result = await GET({ url: CUSTOMER_API.WALLET, mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result;
}

export async function getPromo() {
  const result = await GET({ url: CUSTOMER_API.PROMO, mock: true });
  if (!isValid(result)) {
    return [];
  }
  return result.data;
}

export async function updateProfile(data) {
  const url = CUSTOMER_API.INFO;
  const result = await PUT({ url, body: data });
  return result;
}

export default {
  getOrder,
  getReferral,
  getWallet,
  getPromo,
  updateProfile,
  sendSms,
  retrySendSms,
};
