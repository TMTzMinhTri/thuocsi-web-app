import { ValidateUtils } from 'utils';

const validateForm = ({
  businessName = '',
  mst = '',
  email = '',
  address = '',
//   provinceCode,
//   districtCode,
//   wardCode,
}) => {
  if (ValidateUtils.isEmpty(businessName)) throw Error('tên phòng khám không được trống');
  if (ValidateUtils.isEmpty(mst)) throw Error('mã số thuế không được trống');
  if (ValidateUtils.isEmpty(email)) throw Error('email không được trống');
  if (ValidateUtils.isEmpty(address)) throw Error('địa chỉ không được trống');

  if (!ValidateUtils.validateEmail(email)) throw Error('email sai định dạng');
  if (!ValidateUtils.isNumber(mst)) throw Error('mã số thuế sai định dạng');
};

export default validateForm;
