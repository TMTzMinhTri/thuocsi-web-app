import { PUT } from './Clients';

async function Checkout(body) {
  const result = await PUT({ url: '/marketplace/order/v1/cart/checkout', body });
  return result;
}

export default {
  Checkout,
};
