import Cookies from 'js-cookie';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE } from 'constants/Cookies';
import { CookiesParser } from 'utils';
import { API_HOST, MOCK_API_HOST } from '../../config/index';

export function getSessionToken(ctx) {
  const tk = CookiesParser.getCookieFromCtx(ctx, ACCESS_TOKEN);
  if (tk && tk.length > 0) {
    return tk;
  }
  return CookiesParser.getCookieFromCtx(ctx, ACCESS_TOKEN_LONGLIVE);
}

async function request(props) {
  const { url, headers = {}, method, body, mock = false, isAuth = true, ctx = null } = props;
  /*
    mock api : folder:  /api
    dev / production : /backend
   */
  const link = mock ? `${MOCK_API_HOST}${url}` : `${API_HOST}${url}`;
  if (isAuth) {
    if (ctx) {
      const AuthorizationValue = getSessionToken(ctx);
      if (AuthorizationValue) {
        headers['user-agent'] = ctx.req.headers['user-agent'];
        headers.Authorization = `Bearer ${AuthorizationValue}`;
      }
    } else {
      const AuthorizationValue = Cookies.get(ACCESS_TOKEN);
      if (AuthorizationValue) {
        headers.Authorization = `Bearer ${AuthorizationValue}`;
      }
    }
  }
  const res = await fetch(link, {
    method,
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: typeof body === 'object' ? JSON.stringify(body) : body,
  });
  const result = await res.json();
  return result;
}

export async function GET(props) {
  return request({ ...props, method: 'GET' });
}

export async function POST(props) {
  return request({ ...props, method: 'POST' });
}

export async function PUT(props) {
  return request({ ...props, method: 'PUT' });
}

export async function DELETE(props) {
  return request({ ...props, method: 'DELETE' });
}

export function isValid(resp) {
  return resp && resp.data && resp.status && resp.status === 'OK';
}

export default { GET, POST, PUT, DELETE, isValid, getSessionToken };
