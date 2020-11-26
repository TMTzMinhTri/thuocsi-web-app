import { API_HOST } from '../../config/index';

async function request({ url, method, body }) {
  const link = `${API_HOST}${url}`;
  const res = await fetch(link, {
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  const result = await res.json();
  return result;
}

export async function GET(url) {
  return request({ url, method: 'GET' });
}

async function POST(url, body) {
  return request({ url, method: 'POST', body });
}

async function PUT(url, body) {
  return request({ url, method: 'PUT', body });
}

async function DELETE(url, body) {
  return request({ url, method: 'DELETE', body });
}

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
