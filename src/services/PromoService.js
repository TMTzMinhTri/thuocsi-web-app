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
  const message = [];

  switch (type) {
    case 'ORDER_VALUE':
      if (minOrderValue) {
        message.push(`Giá trị đơn hàng lớn hơn ${formatCurrency(minOrderValue)}`);
      }

      break;
    case 'PRODUCT_TAG':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { productTag, sellerCodes, minQuantity } = _item;
          message.push(`Cần mua ít nhất ${formatNumber(
            minQuantity,
          )} sản phẩm có mã ${productTag} của người bán ${sellerCodes.join(',')}
          `);
        });
      }
      break;
    case 'PRODUCT':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { productId, sellerCodes, minQuantity } = _item;
          message.push(`Cần mua ít nhất ${formatNumber(
            minQuantity,
          )} sản phẩm có mã ${productId} của người bán ${sellerCodes.join(',')}
          `);
        });
      }
      break;
    case 'PRODUCT_CATEGORY':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { productId, sellerCodes, minQuantity } = _item;
          message.push(`Cần mua ít nhất ${formatNumber(
            minQuantity,
          )} sản phẩm có hoạt chất ${productId} của người bán ${sellerCodes.join(',')}
          `);
        });
      }
      break;
    case 'PRODUCER':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { producerCode, sellerCodes, minQuantity } = _item;
          message.push(
            `Cần mua ít nhất ${formatNumber(
              minQuantity,
            )} sản phẩm của nhà sản xuất ${producerCode} của người bán ${sellerCodes.join(',')}`,
          );
        });
      }
      break;
    case 'INGREDIENT':
      if (productConditions) {
        productConditions.forEach((_item) => {
          const { ingredientCode, sellerCodes, minQuantity } = _item;
          message.push(`Cần mua ít nhất ${formatNumber(
            minQuantity,
          )} sản phẩm có hoạt chất ${ingredientCode} của người bán ${sellerCodes.join(',')}
          `);
        });
      }

      break;
    case 'NO_RULE':
      // if (!productConditions) {
      //   return { message };
      // }

      break;
    default:
  }
  return { ...condition, message };
};

export const parseListReward = (rewards) => rewards.map((reward) => parseReward(reward));

export const parseListCondition = (conditions) => conditions.map((cond) => parseCondition(cond));

export const parseVoucherDetail = (voucherInfo) => {
  if (!voucherInfo) return null;

  const { rewards = [], conditions = [] } = voucherInfo;
  const rewardsVi = parseListReward(rewards);
  const conditionsVi = parseListCondition(conditions);
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
const beautyPromo = ({
  conditions,
  code,
  endTime,
  promotionName,
  promotionType,
  status,
  type,
  voucherId,
  rewards,
  startTime,
  voucherCodes,
}) => ({
  conditions,
  code,
  endTime,
  promotionName,
  promotionType,
  status,
  type,
  voucherId,
  rewards,
  startTime,
  voucherCodes,
});

async function getPromoActive({ ctx }) {
  const promoRes = await PromoClient.getPromosActive({ ctx });
  if (!isValid(promoRes)) {
    return [];
  }
  const promoActive = promoRes.data.map((item) => beautyPromo(item));
  return promoActive;
}

export const parseListConditionVoucher = (vouchers = []) =>
  vouchers.reduce((voucherList, promo) => {
    const { conditions, voucherCodes = [], rewards, promotionType } = promo;

    return [
      ...voucherList,
      ...voucherCodes?.map((v) =>
        parseVoucherDetail({
          ...v,
          conditions,
          rewards,
          promotionType,
        }),
      ),
    ];
  }, []);

export const getVoucherCodesActive = async ({ ctx }) => {
  const promoActive = await getPromoActive({ ctx });

  return parseListConditionVoucher(promoActive);
};

const getPromoCodeDetail = async (voucherCode) => {
  const promoDetailResult = await PromoClient.getPromoDetailByVoucherCode({ voucherCode });
  if (!isValid(promoDetailResult)) {
    return promoDetailResult;
  }
  // map data detail
  const data = getFirst(promoDetailResult);
  const { promotion } = data;

  return {
    ...promoDetailResult,
    data: [parseVoucherDetail({ ...promotion, voucherCodes: [{ ...data, promotion: null }] })],
  };
};

export default {
  getPromoActive,
  getPromotionDetailByVoucherCode,
  parseListReward,
  parseReward,
  getVoucherCodesActive,
  getPromoCodeDetail,
};
