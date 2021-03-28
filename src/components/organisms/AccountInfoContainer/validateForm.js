import { ValidateUtils } from 'utils';

const DEFAULT_PROVINCE_VALUE = '0';
const DEFAULT_DISTRICT_VALUE = '0';
const DEFAULT_WARD_VALUE = '0';

const validateForm = ({
  name,
  phone,
  email,
  //   password,
  address,
  provinceCode,
  districtCode,
  wardCode,
  // deliveryProvinceCode,
  // deliveryDistrictCode,
  // deliveryWardCode,
  mst,
}) => {
  // check empty or null
  if (ValidateUtils.isEmpty(name)) throw Error('Bạn chưa điền tên');
  if (ValidateUtils.isEmpty(phone)) throw Error('Bạn chưa điền số điện thoại');
  if (ValidateUtils.isEmpty(mst)) throw Error('Bạn chưa điền mã số thuế');
  if (ValidateUtils.isEmpty(address)) throw Error('Bạn chưa điền địa chỉ');

  if (!provinceCode || provinceCode === DEFAULT_PROVINCE_VALUE)
    throw Error('Tỉnh/Thành Phố không được trống');
  if (!districtCode || districtCode === DEFAULT_DISTRICT_VALUE)
    throw Error('Quận/Huyện không được trống');
  if (!wardCode || wardCode === DEFAULT_WARD_VALUE) throw Error('Phường/Xã phố không được trống');

  // if (deliveryProvinceCode === DEFAULT_PROVINCE_VALUE)
  //   throw Error('Tỉnh/Thành Phố không được trống');
  // if (deliveryDistrictCode === DEFAULT_DISTRICT_VALUE) throw Error('Quận/Huyện không được trống');
  // if (deliveryWardCode === DEFAULT_WARD_VALUE) throw Error('Phường/Xã phố không được trống');

  // validate
  if (!ValidateUtils.validatePhone(phone)) throw Error('Số điện thoại sai định dạng');
  if (!ValidateUtils.validateEmail(email)) throw Error('Email sai định dạng');
  if (!ValidateUtils.isNumber(mst)) throw Error('Mã số thuế sai định dạng');
};

export default validateForm;
