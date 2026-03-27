const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
});

export function formatCurrency(value) {
  if (value == null || isNaN(value)) return '0 VND';
  return formatter.format(value);
}

export function formatNumber(value) {
  if (value == null || isNaN(value)) return '0';
  return new Intl.NumberFormat('vi-VN').format(value);
}
