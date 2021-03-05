import { PRICING_API } from 'constants/APIUri';
import { GET } from './Clients';

export const getDeliveryMethod = async ({ ctx }) => GET({ url: PRICING_API.DELIVERY_METHOD, ctx });
export const getPaymentMethod = async ({ ctx }) => GET({ url: PRICING_API.PAYMENT_METHOD, ctx });

export default { getDeliveryMethod, getPaymentMethod };
