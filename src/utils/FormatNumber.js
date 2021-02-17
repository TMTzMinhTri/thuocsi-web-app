import ValidateUtils from './ValidateUtils';

export function formatCurrency(n, separate = '.', currency) {
  const num = ValidateUtils.isNumber(n) ? n : 0;
  const s = String(num);
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)} `;
  const cur = (currency && currency) || ' đ';
  return ret + cur;
}

export function formatNumber(n, separate = '.') {
  const num = ValidateUtils.isNumber(n) ? n : 0;
  const s = String(num);
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)} `;
  return ret;
}

export default { formatNumber, formatCurrency };
