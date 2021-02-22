import { isValid, PromoClient } from 'clients';

async function getPromoActive({ ctx }) {
  const promoRes = await PromoClient.getPromosActive({ ctx });
  if (!isValid(promoRes)) {
    return [];
  }
  const promos = promoRes.data.reduce((acc, current) => {
    const { rewards, conditions, endTime, promotionName, promotionType } = current;
    const pros = current.voucherCodes.map((vc) => ({ ...vc, rewards, conditions, promotionName, promotionType, endTime }));
    return [...acc, ...pros];
  }, []);
  return promos;
}

export default {
  getPromoActive,
};
