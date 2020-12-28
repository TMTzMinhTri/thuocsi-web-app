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

export default {
  getFormattedDate,
  getDayOfWeek,
  getFormattedWithDate,
};
