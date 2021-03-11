import { getFirst, isValid, PromoClient } from 'clients';
import { isEmpty } from 'utils/ValidateUtils';
import { PROMO_REWARD_TYPE } from 'constants/Enums';
import { formatCurrency, formatNumber } from 'utils/FormatNumber';

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

export const parseCondition = (condition) => {
  if (!condition) return null;

  const { type, minOrderValue, productConditions } = condition;
  let temp = [];

  let message = null;
  switch (type) {
    case 'ORDER_VALUE':
      if (minOrderValue) {
        message = `Giá trị đơn hàng lơn hơn ${formatCurrency(minOrderValue)}`;
      }
      break;
    case 'PRODUCT_TAG':
      if (productConditions) {
        temp = productConditions.map(({ minQuantity, productTag, sellerCodes }) => {
          message = `Cần mua ít nhất ${formatNumber(
            minQuantity,
          )} sản phẩm có mã ${productTag} của người bán ${sellerCodes.join(',')}
          `;
          return { ...condition, message };
        });
      }
      break;
    case 'PRODUCER':
      if (productConditions) {
        const { minQuantity, producerCode, sellerCodes } = productConditions[0];
        message = `Cần mua ít nhất ${formatNumber(
          minQuantity,
        )} sản phẩm của nhà sản xuất ${producerCode} của người bán ${sellerCodes.join(',')}`;
      }
      break;
    case 'NO_RULE':
      // message = 'Không cần điều kiện';
      break;
    default:
  }
  if (type === 'PRODUCT_TAG') {
    return temp;
  }
  return [{ ...condition, message }];
};

export const parseListReward = (rewards) => rewards.map((reward) => parseReward(reward));

export const parseListCondition = (conditions) => conditions.map((cond) => parseCondition(cond));

export const parseVoucherDetail = (voucherInfo) => {
  if (!voucherInfo) return null;

  const { rewards, conditions } = voucherInfo;

  const rewardsVi = parseListReward(rewards);
  const conditionsVi = parseListCondition(conditions)[0];

  return { ...voucherInfo, rewardsVi, conditionsVi };
};

export const getPromotionDetailByVoucherCode = async ({ voucherCode }) => {
  if (isEmpty(voucherCode)) {
    return null;
  }
  const res = await PromoClient.getPromoDetailByVoucherCode({ voucherCode });
  const voucherInfo = getFirst(res);
  const { conditions, rewards } = voucherInfo?.promotion || {};

  return parseVoucherDetail({ ...voucherInfo, conditions, rewards });
};

async function getPromoActive({ ctx }) {
  const promoRes = await PromoClient.getPromosActive({ ctx });
  if (!isValid(promoRes)) {
    return [];
  }

  const promoActive = promoRes.data;

  return promoActive;
}

export const getVoucherCodesActive = async ({ ctx }) => {
  const promoActive = await getPromoActive({ ctx });

  const vouchers = promoActive.reduce((voucherList, promo) => {
    const { conditions, voucherCodes, rewards, promotionType } = promo;

    return [
      ...voucherList,
      ...voucherCodes.map((v) =>
        parseVoucherDetail({
          ...v,
          conditions,
          rewards,
          promotionType,
        }),
      ),
    ];
  }, []);

  return vouchers;
};

export default {
  getPromoActive,
  getPromotionDetailByVoucherCode,
  parseListReward,
  parseReward,
  getVoucherCodesActive,
};
