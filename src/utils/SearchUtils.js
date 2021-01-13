const searchString = (arr, str) => {
  console.log(arr);
  const result = arr.filter((el) => (
    el.indexOf(str) > -1));
  return result;
};

export default { searchString };
