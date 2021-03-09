const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isEmpty = (val) =>
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

const isNumber = (str) => {
  try {
    if (typeof str === 'number') return true;
    if (typeof str !== 'string') return false;
    return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
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
  if (isEmpty(email)) throw new Error('Bạn chưa điền thông tin email', 'email');
  if (!validateEmail(email)) throw new Error('Email chưa đúng định dạng', 'email');
};

const funcValidateName = (name) => {
  if (isEmpty(name)) throw new Error('Bạn chưa nhập họ tên', 'name');
};

// eslint-disable-next-line operator-linebreak
const passwordError =
  'Mật khẩu phải lớn hơn 8 ký tự có chứa ít nhất 1 chữ thường, 1 chữ hoa, và 1 số';

const regexOneLowerOneUpperOneDigit = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

const funcValidatePassword = (pass) => {
  if (isEmpty(pass)) throw new Error('Bạn chưa điền mật khẩu', 'password');

  if (pass.length <= 8 || !regexOneLowerOneUpperOneDigit.test(pass)) {
    throw new Error(passwordError, 'password');
  }
};

const funcValidatePhoneNumber = (phone) => {
  if (isEmpty(phone)) throw new Error('Bạn chưa điền số điện thoại', 'phone');
  if (!validatePhone(phone)) {
    throw new Error('Số điện thoại không đúng định dạng', 'phone');
  }
};

const validateData = {
  email: funcValidateEmail,
  name: funcValidateName,
  password: funcValidatePassword,
  phoneNumber: funcValidatePhoneNumber,
};

const hasWhiteSpace = (s) => /\s/g.test(s);

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
  hasWhiteSpace,
};
