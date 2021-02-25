import { getFirst, isValid, PromoClient } from 'clients';
import { isEmpty } from 'utils/ValidateUtils';
import { PROMO_REWARD_TYPE } from 'constants/Enums';
import { formatCurrency } from 'utils/FormatNumber';

async function getPromoActive({ ctx }) {
  const promoRes = await PromoClient.getPromosActive({ ctx });
  if (!isValid(promoRes)) {
    return [];
  }
  const promos = promoRes.data.reduce((acc, current) => {
    const { rewards, conditions, endTime, promotionName, promotionType } = current;
    const pros = current.voucherCodes.map((vc) => ({
      ...vc,
      rewards,
      conditions,
      promotionName,
      promotionType,
      endTime,
    }));
    return [...acc, ...pros];
  }, []);
  return promos;
}

export const parseReward = (reward) => {
  if (!reward) {
    return null;
  }
  const { type, absoluteDiscount } = reward;

  switch (type) {
    case PROMO_REWARD_TYPE.ABSOLUTE:
      return { message: `Giảm ${formatCurrency(absoluteDiscount)}` };
    default:
      return null;
  }
};

export const parseListReward = (rewards) => rewards.map((reward) => parseReward(reward));

export const parseVoucherDetail = (voucherInfo) => {
  if (!voucherInfo) return null;

  const { promotion } = voucherInfo;

  if (!promotion) return voucherInfo;

  const { rewards } = promotion;

  const rewardsVi = parseListReward(rewards);

  return { ...voucherInfo, rewardsVi };
};

export const getPromotionDetailByVoucherCode = async ({ voucherCode }) => {
  if (isEmpty(voucherCode)) {
    return null;
  }
  const res = await PromoClient.getPromoDetailByVoucherCode({ voucherCode });
  const voucherInfo = getFirst(res);
  return parseVoucherDetail(voucherInfo);
};

export default {
  getPromoActive,
  getPromotionDetailByVoucherCode,
  parseListReward,
  parseReward,
};
