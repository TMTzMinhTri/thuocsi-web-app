import { TICKET_API } from 'constants/APIUri';
import { GET, POST } from './Clients';

const createFeedback = (body) => {
  const url = TICKET_API.TASK;
  return POST({ url, body });
};

export const getListReasons = (ctx) => {
  const url = TICKET_API.TASK_REASONS;
  return GET({ url, ctx });
};

export default {
  createFeedback,
  getListReasons,
};
