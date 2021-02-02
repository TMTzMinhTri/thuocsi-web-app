import { PromoClient } from 'clients';

async function getPromoActive({ ctx }) {
  const [promoRes] = await Promise.all([PromoClient.getPromosActive({ ctx })]);
  const promos = promoRes.data.reduce((acc, current) => {
    const { rule, promotionName, promotionType } = current;
    const pros = current.voucherCode.map((vc) => ({ ...vc, rule, promotionName, promotionType }));
    return [...acc, ...pros];
  }, []);
  return promos;
}

export default {
  getPromoActive,
};
