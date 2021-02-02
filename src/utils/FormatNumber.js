export function formatCurrency(n, separate = '.', currency) {
  const s = n.toString();
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)} `;
  const cur = (currency && currency) || ' đ';
  return ret + cur;
}

export function formatNumber(n, separate = '.') {
  const s = n.toString();
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)} `;
  return ret;
}

export default { formatNumber, formatCurrency };
