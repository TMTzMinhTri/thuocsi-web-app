import { SUPPLIER_API } from 'constants/APIUri';
import { GET } from './Clients';

async function getInfoSupplier(ctx) {
  const url = SUPPLIER_API.SUPPLIER_INFO;
  const params = {
    q: ctx.query.slug || null,
  };
  const result = await GET({ url, isBasic: true, ctx, params });
  return result;
}

export default {
  getInfoSupplier,
};
