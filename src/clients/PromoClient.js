import { PROMOTION_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

async function getPromos(ctx) {
  const url = PROMOTION_API.PROMOTION_ALL;
  const res = await GET({ url, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

async function getPromosByStatus(ctx, status) {
  const stringify = encodeURI(JSON.stringify({ status }));
  const url = `${PROMOTION_API.PROMOTION_ALL}?q=${stringify}`;
  const res = await GET({ url, ctx, isBasic: true });
  console.log(url);
  console.log(res);
  if (!isValid(res)) {
    return [];
  }
  return res.data;
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
  getPromosByStatus,
};
