import { ValidateUtils } from 'utils';

const validateForm = ({
  businessName = '',
  mst = '',
  email = '',
  address = '',
  provinceCode,
  districtCode,
  wardCode,
}) => {
  if (ValidateUtils.isEmpty(businessName)) throw Error('Tên phòng khám không được trống');
  if (ValidateUtils.isEmpty(mst)) throw Error('Mã số thuế không được trống');
  if (ValidateUtils.isEmpty(email)) throw Error('Email không được trống');
  if (ValidateUtils.isEmpty(address)) throw Error('Địa chỉ không được trống');
  if (provinceCode === '0') throw Error('Tỉnh/Thành Phố không được trống');
  if (districtCode === '0') throw Error('Quận/Huyện không được trống');
  if (wardCode === '0') throw Error('Phường/Xã phố không được trống');

  if (!ValidateUtils.validateEmail(email)) throw Error('email sai định dạng');
  if (!ValidateUtils.isNumber(mst)) throw Error('mã số thuế sai định dạng');
};

export default validateForm;
