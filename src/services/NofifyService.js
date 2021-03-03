import { getFirst, isValid, NotifyClient } from 'clients';

export const getTotalNotification = async ({ ctx }) => {
  const res = await NotifyClient.getTotalNotification({ ctx });
  if (!isValid(res)) {
    return {};
  }
  return getFirst(res);
};

export const getNotifications = async ({ ctx }) => {
  const res = await NotifyClient.getNotify({ ctx });
  return res;
};

export default {
  getTotalNotification,
  getNotifications,
};
