import { parseBody } from 'next/dist/next-server/server/api-utils';
import { getFirst } from 'clients';
import { AuthService } from 'services';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE } from 'constants/index';
import { ResponseUtils } from 'utils';

export async function getServerSideProps(ctx) {
  const returnObject = { props: {} };
  const { res } = ctx;
  if (ctx.req && ctx.req.method === 'POST') {
    // read form data
    const body = await parseBody(ctx.req, '1kb');

    // if empty data
    const { username, password, remember = false } = body;
    if (!username || !password) {
      return res.json(ResponseUtils.invalid('Bạn chưa điền thông tin đăng nhập'));
    }
    // call backend API
    const headers = {
      'User-Agent': ctx.req.headers['user-agent'],
    };
    if (ctx.req.headers['x-forwarded-for']) {
      headers['X-Forwarded-For'] = ctx.req.headers['x-forwarded-for'];
    }

    const result = await AuthService.login(body);

    // if OK, do set cookie & redirect page to relative target
    if (result.status === 'OK') {
      const data = getFirst(result);

      const listCookies = [`${ACCESS_TOKEN}=${data.bearerToken}; Path=/; HttpOnly`];
      if (remember) {
        listCookies.add(
          `${ACCESS_TOKEN_LONGLIVE}=${data.bearerToken}; Max-Age=${
            3600 * 24 * 4
          }; Path=/; HttpOnly`,
        );
      }

      res.setHeader('set-cookie', listCookies);
      res.setHeader('location', '/');
      res.statusCode = 302;
      res.end();
    } else {
      returnObject.props.errorCode = result.errorCode;
    }

    returnObject.props.url = body?.url || '/';
  } else {
    if (typeof window === 'undefined') {
      res.setHeader('set-cookie', [
        `${ACCESS_TOKEN}=deleted;Path=/; Max-Age=1; HttpOnly`,
        `${ACCESS_TOKEN_LONGLIVE}=delete; Path=/; Max-Age=1; HttpOnly`,
      ]);
    }
    returnObject.props.url = ctx.query.url || '/';
  }
  return returnObject;
}

export default function LoginPage() {
  return null;
}
