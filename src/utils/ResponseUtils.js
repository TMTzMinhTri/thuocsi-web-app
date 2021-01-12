import { HTTP_STATUS } from 'constants/index';

const resposne = (status, message) => ({ status, message });

export const notfound = (msg) => resposne(HTTP_STATUS.NotFound, msg);
export const invalid = (msg) => resposne(HTTP_STATUS.invalid, msg);
export const ok = (msg) => resposne(HTTP_STATUS.Ok, msg);
export const error = (msg) => resposne(HTTP_STATUS.Error, msg);
export const existed = (msg) => resposne(HTTP_STATUS.Existed, msg);
export const forbidden = (msg) => resposne(HTTP_STATUS.Forbidden, msg);
export const unauthorized = (msg) => resposne(HTTP_STATUS.Unauthorized, msg);

export const parse = (resp) => {
  if (resp) {
    return resp;
  }
  return error('Hệ thống đang tạm dừng, xin vui lòng thử lại sau');
};

export default { notfound, invalid, ok, error, existed, forbidden, unauthorized };
