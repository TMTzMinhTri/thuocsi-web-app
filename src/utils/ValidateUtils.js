const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isEmpty = (val) => val || val.length === 0;

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
    Number(val);
    return true;
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

export default {
  validateEmail,
  isEmpty,
  isNumber,
  checkLength,
  formValidateEmail,
};
