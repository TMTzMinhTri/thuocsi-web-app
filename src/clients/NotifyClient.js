import { NOTIFICATION_API } from 'constants/APIUri';
import { GET } from './Clients';

export const getNotify = async ({ ctx }) => {
  const url = NOTIFICATION_API.NOTIFICATION_LIST;
  return GET({ url, ctx });
};

export const getTotalNotification = async ({ ctx }) => {
  const url = NOTIFICATION_API.NOTIFICATION_COUNTER;
  return GET({ url, ctx });
};

export default {
  getNotify,
  getTotalNotification,
};
