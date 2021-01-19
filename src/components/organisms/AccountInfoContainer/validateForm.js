import { ValidateUtils } from 'utils';

const validateForm = ({
  name,
  phone,
  email,
  //   password,
  mst,
}) => {
  if (!ValidateUtils.isEmpty(name)) throw Error('Bạn chưa điền tên');
  if (!ValidateUtils.isEmpty(phone)) throw Error('Bạn chưa điền số điện thoại');
  if (!ValidateUtils.isEmpty(email)) throw Error('Bạn chưa điền email');

  if (!ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại sai định dạng');
  if (!ValidateUtils.validateEmail(email)) throw Error('Email sai định dạng');
  if (!ValidateUtils.isNumber(mst)) throw Error('Mã số thuế sai định dạng');
};

export default validateForm;
