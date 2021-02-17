import { PUT } from './Clients';

async function Checkout(body) {
  return PUT({ url: '/marketplace/order/v1/cart/checkout', body });
}

export default {
  Checkout,
};
