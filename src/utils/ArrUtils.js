export const convertArrayToMap = (arr, key) => new Map(arr.map((obj) => [obj[key], obj]));

export const convertArrayToMapValue = (arr, key, value) =>
  new Map(arr.map((obj) => [obj[key], obj[value]]));

export default { convertArrayToMap };
