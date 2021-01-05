import { CONTENT_API } from 'constants/APIUri';
import { POST } from './Clients';

async function loadContent(url) {
  const result = await POST({ url: `${CONTENT_API.STATIC_CONTENT}/${url}`, mock: true });
  return result.data;
}

export default {
  loadContent,
};
