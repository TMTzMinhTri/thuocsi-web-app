export const convertObjectToParameter = (params) => {
  if (params == null) return '';
  return new URLSearchParams(params).toString();
};

export default {
  convertObjectToParameter,
};
