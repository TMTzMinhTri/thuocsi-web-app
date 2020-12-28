import { toast } from 'react-toastify';

const info = (text) => {
  toast.info(text);
};

const success = (text) => {
  toast.success(text);
};

const dark = (text) => {
  toast.dark(text);
};

const error = (text) => {
  toast.error(text);
};

const warn = (text) => {
  toast.warn(text);
};

export default { info, success, dark, error, warn };
