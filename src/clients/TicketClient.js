import { TICKET_API } from 'constants/APIUri';
import { POST } from './Clients';

const createFeedback = (body) => {
  const url = TICKET_API.TASK;
  return POST({ url, body });
};

export default {
  createFeedback,
};
