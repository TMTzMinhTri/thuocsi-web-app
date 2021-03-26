import { PRICING_API } from 'constants/APIUri';
import { GET } from './Clients';

export const getDeliveryMethod = async ({ ctx }) => GET({ url: PRICING_API.DELIVERY_METHOD, ctx });
export const getPaymentMethod = async ({ ctx }) => GET({ url: PRICING_API.PAYMENT_METHOD, ctx });

const getDetailDeliveryMethod = ({ deliveryPlatformCode, ctx }) =>
  GET({ ctx, url: PRICING_API.DELIVERY_METHOD_DETAIL, params: { deliveryPlatformCode } });

const getDetailPaymentMethod = ({ paymentMethodCode, ctx }) =>
  GET({ ctx, url: PRICING_API.PAYMENT_METHOD_DETAIL, params: { paymentMethodCode } });

export default {
  getDeliveryMethod,
  getPaymentMethod,
  getDetailDeliveryMethod,
  getDetailPaymentMethod,
};
