const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const debounceFunc = (time) => debounce((cb) => cb(), time);
export const debounceFunc100 = debounceFunc(100);
export const debounceFunc200 = debounceFunc(200);
export const debounceFunc500 = debounceFunc(500);
export const debounceFunc1000 = debounceFunc(1000);

export default debounce;
