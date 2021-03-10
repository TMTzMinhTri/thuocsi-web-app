import { MARKETING_API } from 'constants/APIUri';
import { GET } from './Clients';

const getListBanner = (ctx) => {
  const url = MARKETING_API.BANNER;
  return GET({ url, ctx, isBasic: true });
};

export default {
  getListBanner,
};
