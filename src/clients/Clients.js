import Cookies from 'js-cookie';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE } from 'constants/Cookies';
import { HTTP_STATUS } from 'constants/Enums';
import { CookiesParser, RequestUtils } from 'utils';
import { API_HOST, MOCK_API_HOST, BASIC_AUTHEN } from '../../config/index';

export function getSessionToken(ctx) {
  const tk = CookiesParser.getCookieFromCtx(ctx, ACCESS_TOKEN);
  if (tk && tk.length > 0) {
    return tk;
  }
  return CookiesParser.getCookieFromCtx(ctx, ACCESS_TOKEN_LONGLIVE);
}

export function getSessionTokenClient() {
  const tk = Cookies.get(ACCESS_TOKEN);
  if (tk && tk.length > 0) {
    return tk;
  }
  return Cookies.get(ACCESS_TOKEN_LONGLIVE);
}

async function request(props) {
  try {
    const {
      url,
      headers = {},
      params,
      method,
      body,
      mock = false,
      isAuth = true,
      ctx = null,
      isBasic = false,
    } = props;
    /*
    mock api : folder:  /api
    dev / production : /backend
   */

    let link = mock ? `${MOCK_API_HOST}${url}` : `${API_HOST}${url}`;

    if (params) {
      const parameter = RequestUtils.convertObjectToParameter(params);
      link += (link.indexOf('?') >= 0 ? '' : '?') + parameter;
    }

    let isUseBasic = false;
    if (isAuth) {
      if (ctx) {
        const AuthorizationValue = getSessionToken(ctx);
        if (AuthorizationValue) {
          headers['user-agent'] = ctx.req.headers['user-agent'];
          headers.Authorization = `Bearer ${AuthorizationValue}`;
        }
      } else {
        const AuthorizationValue = getSessionTokenClient();
        if (AuthorizationValue) {
          headers.Authorization = `Bearer ${AuthorizationValue}`;
        }
      }

      if (isBasic && (!headers.Authorization || headers.Authorization.length === 0)) {
        headers.Authorization = BASIC_AUTHEN;
        isUseBasic = true;
      }
    }
    // console.log(' fetch data ', link, method, headers, body);
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
    if (isUseBasic) {
      result.isBasic = true;
    }
    // console.log('result', result);
    return result;
  } catch (err) {
    return {
      error: err,
      status: HTTP_STATUS.Error,
      data: [],
      message: err.message || ' Hệ thống đã xảy ra lỗi .',
    };
  }
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
  return resp && resp.status && resp.status === HTTP_STATUS.Ok && resp.data && resp.data[0];
}

export function isValidWithoutData(resp) {
  return resp && resp.status && resp.status === HTTP_STATUS.Ok;
}

// @deprecate in next release
export function isValidWithData(resp) {
  return resp && resp.status && resp.status === HTTP_STATUS.Ok && resp.data && resp.data[0];
}

export default {
  GET,
  POST,
  PUT,
  DELETE,
  isValid,
  isValidWithData,
  getSessionToken,
  isValidWithoutData,
};
