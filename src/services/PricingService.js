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

export default { getListPaymentMethod, getListDeliveryMethod };
