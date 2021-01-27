import { GET, isValid } from './Clients';

async function getInfoSupplier(ctx) {
  const result = await GET({ url: '/supplier', mock: true, ctx });
  if (!isValid(result)) return [];
  return result.data[0];
}

export default {
  getInfoSupplier,
};
