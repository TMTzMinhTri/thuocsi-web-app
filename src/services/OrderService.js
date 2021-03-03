import { OrderClient } from 'clients';

export const deleteOrder = async ({ orderNo }) => {
  const res = await OrderClient.deleteOrder({ orderNo });
  return res;
};

export default { deleteOrder };
