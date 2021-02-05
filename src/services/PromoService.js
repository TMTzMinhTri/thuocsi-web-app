import { isValid, PromoClient } from 'clients';

async function getPromoActive({ ctx }) {
  const promoRes = await PromoClient.getPromosActive({ ctx });
  if (!isValid(promoRes)) {
    return [];
  }
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
