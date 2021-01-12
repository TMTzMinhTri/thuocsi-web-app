import { CONTENT_API } from 'constants/APIUri';
import { POST } from './Clients';

async function loadContent(url = '') {
  const staticUrl = `${CONTENT_API.STATIC_CONTENT}/${url}`;
  const result = await POST({ url: staticUrl, mock: true });
  return result?.data;
}

export default {
  loadContent,
};
