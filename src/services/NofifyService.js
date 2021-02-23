import { isValid, NotifyClient } from 'clients';

export const getListNotify = async ({ ctx }) => {
  const res = await NotifyClient.getNotify({ ctx });
  if (isValid(res)) {
    return [];
  }
  return res.data;
};

export default {
  getListNotify,
};
