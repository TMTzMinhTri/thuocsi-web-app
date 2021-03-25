import { isValid, PricingClients } from 'clients';

export const getListPaymentMethod = async ({ ctx }) => {
  const paymentsRes = await PricingClients.getPaymentMethod({ ctx });
  if (!isValid(paymentsRes)) {
    return [];
  }
  return paymentsRes.data;
};

export const getListDeliveryMethod = async ({ ctx }) => {
  const deliveryRes = await PricingClients.getDeliveryMethod({ ctx });
  if (!isValid(deliveryRes)) {
    return [];
  }
  return deliveryRes.data;
};

export const getDetailPaymentMethod = async ({ ctx, paymentMethodCode }) => {
  const paymentMethodRes = await PricingClients.getPaymentMethod({ ctx, paymentMethodCode });
  return paymentMethodRes;
};

export const getDetailDeliveryMethod = async ({ ctx, deliveryPlatformCode }) => {
  const deliveryMethodRes = await PricingClients.getDetailDeliveryMethod({
    ctx,
    deliveryPlatformCode,
  });
  return deliveryMethodRes;
};

export default {
  getListPaymentMethod,
  getListDeliveryMethod,
  getDetailPaymentMethod,
  getDetailDeliveryMethod,
};
