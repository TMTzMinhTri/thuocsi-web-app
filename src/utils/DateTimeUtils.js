function getDayOfWeek(n) {
  if (n === 0) return 'Thứ Hai';
  if (n === 1) return 'Thứ Ba';
  if (n === 2) return 'Thứ Tư';
  if (n === 3) return 'Thứ Năm';
  if (n === 4) return 'Thứ Sáu';
  if (n === 5) return 'Thứ bảy';
  return 'Chủ Nhật';
}
function getFormattedDate(date, format = 'DD/MM/YYYY') {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return format
    .replace('DD', String(day).padStart(2, '0'))
    .replace('MM', String(month).padStart(2, '0'))
    .replace('YYYY', year)
    .replace('HH', String(hour).padStart(2, '0'))
    .replace('mm', String(minute).padStart(2, '0'))
    .replace('ss', String(second).padStart(2, '0'));
}

function getFormattedWithDate(date, format = 'd (DD/MM/YYYY)') {
  const dayOfWeek = date.getDay();

  return getFormattedDate(date, format).replace('d', getDayOfWeek(dayOfWeek));
}

//  Time ago func
const SECOND = 1;
const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const MONTH = 2629746;
const YEAR = 31556952;
const DECADE = 315569520;

const getTimeAgo = (date) => {
  const now = new Date();
  const diff = Math.round((now - +new Date(date)) / 1000);
  let unit = '';
  let num = 0;

  switch (true) {
    case diff <= 0:
      return 'Mới đây';

    case diff < MINUTE:
      num = Math.round(diff / SECOND);
      unit = 'giây';

      break;

    case diff < HOUR:
      num = Math.round(diff / MINUTE);
      unit = 'phút';

      break;

    case diff < DAY:
      num = Math.round(diff / HOUR);
      unit = 'giờ';

      break;

    case diff < MONTH:
      num = Math.round(diff / DAY);
      unit = 'ngày';

      break;

    case diff < YEAR:
      num = Math.round(diff / MONTH);
      unit = 'tháng';

      break;

    case diff < DECADE:
      num = Math.round(diff / YEAR);
      unit = 'năm';

      break;

    default:
      num = Math.round(diff / YEAR);
      unit = 'năm';
  }

  let str = '';
  if (num) {
    str += `${num} `;
  }

  str += `${unit}`;

  str += ' trước';

  return str;
};

export default {
  getFormattedDate,
  getDayOfWeek,
  getFormattedWithDate,
  getTimeAgo,
};
