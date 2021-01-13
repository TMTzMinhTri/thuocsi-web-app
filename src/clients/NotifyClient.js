import { GET, isValid } from './Clients';

async function getNotify(ctx) {
  const res = await GET({ url: '/mock/notifications', mock: true, ctx });
  if (!isValid(res)) {
    return [];
  }
  return res.data;
}

export default {
  getNotify,
};
