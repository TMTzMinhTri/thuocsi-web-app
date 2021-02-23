import { SupplierClient } from 'clients';

export const getInfoSupplier = async (ctx) => {
  const params = {
    q: ctx.query.slug || null,
  };
  SupplierClient.getInfoSupplier({ ctx, params });
};

export default {
  getInfoSupplier,
};
