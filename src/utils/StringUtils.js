export const hashCode = (text) => {
  let hash = 0;
  let i;
  let chr;
  for (i = 0; i < text.length; i += 1) {
    chr = text.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
export const encodeUrl = (url) => encodeURIComponent(url);

export const changeAlias = (alias) => {
  if (!alias || alias.length === 0) {
    return '';
  }
  let str = alias;
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.trim();
  return str;
};
const searchStringInStrings = (arr, str) => {
  if (!str || str.length === 0) {
    return arr;
  }
  const searchValue = str.toUpperCase();
  const searchValueUnsigned = changeAlias(searchValue);
  const isUnSigned = searchValue === searchValueUnsigned;

  let rsUnSigned = arr.filter(
    (el) => el.unsignedKey.toUpperCase().indexOf(searchValueUnsigned, 0) > -1,
  );

  if (isUnSigned) {
    return rsUnSigned;
  }

  const arrSearch = searchValue.split(' ');
  for (let i = 0; i <= arrSearch.length; i += 1) {
    const w = arrSearch[i];

    if (w && w.length > 0 && changeAlias(w) !== w) {
      rsUnSigned = rsUnSigned.filter((el) => el.name.toUpperCase().indexOf(w, 0) > -1);
    }
  }

  return rsUnSigned;
};

export const capitalizeText = (phrase) =>
  phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export default { hashCode, changeAlias, encodeUrl, searchStringInStrings, capitalizeText };
