import { GET } from './Clients';

async function getNotify({ ctx }) {
  const res = await GET({ url: '/mock/notifications', mock: true, ctx });
  return res;
}

export default {
  getNotify,
};
