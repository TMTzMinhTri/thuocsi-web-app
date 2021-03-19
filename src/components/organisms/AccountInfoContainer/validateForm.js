import { ValidateUtils } from 'utils';

const DEFAULT_PROVINCE_VALUE = '0';
const DEFAULT_DISTRICT_VALUE = '0';
const DEFAULT_WARD_VALUE = '0';

const validateForm = ({
  name,
  phone,
  email,
  //   password,
  provinceCode,
  districtCode,
  wardCode,
  deliveryProvinceCode,
  deliveryDistrictCode,
  deliveryWardCode,
  mst,
}) => {
  const err = {};
  // check empty or null
  if (ValidateUtils.isEmpty(name)) err.name = 'Bạn chưa điền tên';
  if (ValidateUtils.isEmpty(phone)) err.phone = 'Bạn chưa điền số điện thoại';
  if (ValidateUtils.isEmpty(mst)) err.mst = 'Bạn chưa điền mã số thuế';

  if (provinceCode === DEFAULT_PROVINCE_VALUE) err.provinceCode = 'Tỉnh/Thành Phố không được trống';
  if (districtCode === DEFAULT_DISTRICT_VALUE) err.districtCode = 'Quận/Huyện không được trống';
  if (wardCode === DEFAULT_WARD_VALUE) err.wardCode = 'Phường/Xã phố không được trống';

  if (deliveryProvinceCode === DEFAULT_PROVINCE_VALUE)
    err.deliveryProvinceCode = 'Tỉnh/Thành Phố không được trống';
  if (deliveryDistrictCode === DEFAULT_DISTRICT_VALUE)
    err.deliveryDistrictCode = 'Quận/Huyện không được trống';
  if (deliveryWardCode === DEFAULT_WARD_VALUE)
    err.deliveryWardCode = 'Phường/Xã phố không được trống';

  // validate
  if (!ValidateUtils.isEmpty(phone) && !ValidateUtils.validatePhone(phone))
    err.phone = 'Số điện thoại sai định dạng';
  if (!ValidateUtils.isEmpty(email) && !ValidateUtils.validateEmail(email))
    err.email = 'Email sai định dạng';
  if (!ValidateUtils.isEmpty(mst) && !ValidateUtils.isNumber(mst))
    err.mst = 'Mã số thuế sai định dạng';
  return err;
};

export default validateForm;
