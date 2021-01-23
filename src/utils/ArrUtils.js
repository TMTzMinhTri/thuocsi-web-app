export const convertArrayToMap = (arr, key) => new Map(arr.map((obj) => [obj[key], obj]));

export default { convertArrayToMap };
