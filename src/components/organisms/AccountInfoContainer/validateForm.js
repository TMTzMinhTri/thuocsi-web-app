import { ValidateUtils } from 'utils';

const validateForm = ({
  name,
  phone,
  email,
  //   password,
  provinceCode,
  districtCode,
  wardCode,
  mst,
}) => {
  if (ValidateUtils.isEmpty(name)) throw Error('Bạn chưa điền tên');
  if (ValidateUtils.isEmpty(phone)) throw Error('Bạn chưa điền số điện thoại');
  if (ValidateUtils.isEmpty(email)) throw Error('Bạn chưa điền email');
  if (provinceCode === '0') throw Error('Tỉnh/Thành Phố không được trống');
  if (districtCode === '0') throw Error('Quận/Huyện không được trống');
  if (wardCode === '0') throw Error('Phường/Xã phố không được trống');

  if (!ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại sai định dạng');
  if (!ValidateUtils.validateEmail(email)) throw Error('Email sai định dạng');
  if (!ValidateUtils.isNumber(mst)) throw Error('Mã số thuế sai định dạng');
};

export default validateForm;
