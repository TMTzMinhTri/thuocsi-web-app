import { toast } from 'react-toastify';
import { hashCode } from './StringUtils';

const show = (text, type) => {
  const toastId = hashCode(text);
  if (!toast.isActive(toastId)) {
    toast(text, {
      toastId,
      type,
    });
  }
};

const info = (text) => {
  show(text, 'info');
};

const success = (text) => {
  show(text, 'success');
};

const dark = (text) => {
  show(text, 'dark');
};

const error = (text) => {
  show(text, 'error');
};

const warn = (text) => {
  show(text, 'warn');
};

export default { info, success, dark, error, warn };
