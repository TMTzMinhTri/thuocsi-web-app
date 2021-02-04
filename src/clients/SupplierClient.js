import { SUPPLIER_API } from 'constants/APIUri';
import { GET, isValid } from './Clients';

async function getInfoSupplier(ctx) {
  const url = SUPPLIER_API.SUPPLIER_ALL;
  const params = {
    q: ctx.query.slug || null,
  };
  const result = await GET({ url, isBasic: true, ctx, params });
  if (!isValid(result)) return [];
  return result.data[0];
}

export default {
  getInfoSupplier,
};
