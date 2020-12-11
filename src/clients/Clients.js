import { API_HOST, MOCK_API_HOST } from '../../config/index';

async function request({ url, headers, method, body, mock = false }) {
  const link = mock ? `${MOCK_API_HOST}${url}` : `${API_HOST}${url}`;

  const res = await fetch(link, {
    method,
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body,
  });
  const result = await res.json();
  return result;
}

export async function GET({ url, mock }) {
  return request({ url, method: 'GET', mock });
}

export async function POST({ url, body, mock }) {
  return request({ url, method: 'POST', body, mock });
}

export async function PUT({ url, body, mock }) {
  return request({ url, method: 'PUT', body, mock });
}

export async function DELETE({ url, body, mock }) {
  return request({ url, method: 'DELETE', body, mock });
}

export async function isValid(resp) {
  return resp && resp.data && resp.status && resp.status === 'OK';
}

export default { GET, POST, PUT, DELETE, isValid };
