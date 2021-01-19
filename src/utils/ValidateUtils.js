const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isEmpty = (val) => !val || val.length === 0 || (typeof val === 'object' && Object.keys(val).length === 0);

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

const ValidateError = (message) => ({ message, validate: false });
const ValidateSuccess = (message) => ({ message, validate: true });

export default {
  validateEmail,
  isEmpty,
  isNumber,
  checkLength,
  formValidateEmail,
  validatePhone,
  ValidateError,
  ValidateSuccess,
};
