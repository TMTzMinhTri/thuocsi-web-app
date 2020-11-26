import { GET } from './Clients';

async function loadDataMostSearch() {
  const result = await GET('/product/most-search');
  return result.data;
}

async function loadFeedback() {
  const result = await GET('/feedback');
  return result.data;
}

export default {
  loadDataMostSearch,
  loadFeedback,
};
