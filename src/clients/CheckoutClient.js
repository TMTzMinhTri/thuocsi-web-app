import { POST } from './Clients';

async function Checkout(body) {
  const result = await POST({ url: '/checkout', body, mock: true });
  return result;
}

export default {
  Checkout,
};
