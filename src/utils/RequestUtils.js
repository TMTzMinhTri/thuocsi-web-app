export const convertObjectToParameter = (params) => new URLSearchParams(params).toString();

export default {
  convertObjectToParameter,
};
