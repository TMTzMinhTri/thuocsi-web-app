function formatCurrency(n, separate = '.') {
  const s = n.toString();
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const ret = `${s.replace(regex, separate)} đ`;
  return ret;
}

export default formatCurrency;
