import { API_HOST } from '../../config/index';

async function loadDataMostSearch() {
  const res = await fetch(`${API_HOST}/most-search`, {
    method: 'GET',
  });
  const result = await res.json();
  return result.data;
}

async function loadFeedback() {
  const res = await fetch(`${API_HOST}/feedback`, {
    method: 'GET',
  });
  const result = await res.json();
  return result.data;
}

export default {
  loadDataMostSearch,
  loadFeedback,
};
