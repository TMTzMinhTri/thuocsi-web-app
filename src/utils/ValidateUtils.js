const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isEmpty = (val) =>
  !val || val.length === 0 || (typeof val === 'object' && Object.keys(val).length === 0);

const checkLength = (val, length) => {
  if (isEmpty(val)) {
    return false;
  }
  if (val.length > length) {
    return false;
  }
  return true;
};

const isNumber = (val) => {
  try {
    return Number.isNaN(val);
  } catch (error) {
    return false;
  }
};

export const formValidateEmail = (e) => {
  if (validateEmail(e.target.value)) {
    return true;
  }
  return false;
};

const validatePhone = (phone) => {
  const re = /^\+?([0-9]{2})\)?[-. ]?([0-9]{2,3})[-. ]?([0-9]{0,3})[-. ]?([0-9]{0,4})$/gim;

  // [-. ] :  Dấu . ngăn cách (optional)
  // +?([0-9]{2})\) : mã quốc gia
  // ([0-9]{2,3} : mã vùng
  // ([0-9]{0,3})[-. ]?([0-9]{0,4}) : dãy số điện thoại
  //
  return re.test(String(phone));
};
function Error(message, type) {
  this.message = message;
  this.type = type;
}
const Success = (message, type) => ({ message, validate: true, type });

const funcValidateEmail = (email) => {
  if (isEmpty(email)) throw new Error('Bạn chưa diền thông tin email', 'email');
  if (!validateEmail(email)) throw new Error('Email chưa đúng định dạng', 'email');
};

const funcValidateName = (name) => {
  if (isEmpty(name)) throw new Error('Bạn chưa diền tên', 'name');
};

const funcValidatePassword = (pass) => {
  if (isEmpty(pass)) throw new Error('Bạn chưa diền mật khẩu', 'password');
};

const funcValidatePhoneNumber = (phoneNumber) => {
  if (isEmpty(phoneNumber)) throw new Error('Bạn chưa điền số điện thoại', 'phoneNumber');
  if (!validatePhone(phoneNumber)) {
    throw new Error('Số điện thoại không đúng định dạng', 'phoneNumber');
  }
};

const validateData = {
  email: funcValidateEmail,
  name: funcValidateName,
  password: funcValidatePassword,
  phoneNumber: funcValidatePhoneNumber,
};

export default {
  validateEmail,
  isEmpty,
  isNumber,
  checkLength,
  formValidateEmail,
  validatePhone,
  Error,
  Success,
  validateData,
};
