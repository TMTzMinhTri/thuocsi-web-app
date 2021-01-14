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

export default {
  getPromos,
};
