import { ValidateUtils } from 'utils';

const validateForm = ({ bankCode }) => {
  if (ValidateUtils.isEmpty(bankCode)) throw Error('Số tài khoản không được rỗng');
  if (!ValidateUtils.isNumber(bankCode)) throw Error('số tài khoản sai định dạng');
};

export default validateForm;
