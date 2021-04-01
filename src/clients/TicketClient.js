import { TICKET_API } from 'constants/APIUri';
import { GET, POST } from './Clients';

const createFeedback = (body) => {
  const url = TICKET_API.TICKET;
  return POST({ url, body });
};

export const getListReasons = (ctx) => {
  const url = TICKET_API.TICKET_REASONS;
  return GET({ url, ctx });
};

export const getListTicket = (ctx) => {
  const url = TICKET_API.TICKET;
  return GET({ url, ctx });
};
export default {
  createFeedback,
  getListReasons,
  getListTicket,
};
