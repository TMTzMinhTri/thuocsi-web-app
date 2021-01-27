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
  const err = {};
  if (ValidateUtils.isEmpty(name)) err.name = 'Bạn chưa điền tên';
  if (ValidateUtils.isEmpty(phone)) err.phone ='Bạn chưa điền số điện thoại';
  if (provinceCode === '0') throw Error('Tỉnh/Thành Phố không được trống');
  if (districtCode === '0') throw Error('Quận/Huyện không được trống');
  if (wardCode === '0') throw Error('Phường/Xã phố không được trống');

  if (!ValidateUtils.isEmpty(phone) && !ValidateUtils.validatePhone(phone)) err.phone = 'Số điện thoại sai định dạng';
  if (!ValidateUtils.isEmpty(email) && !ValidateUtils.validateEmail(email)) err.email = 'Email sai định dạng';
  if (!ValidateUtils.isEmpty(mst) && !ValidateUtils.isNumber(mst)) err.mst = 'Mã số thuế sai định dạng';
  return err;
};

export default validateForm;
