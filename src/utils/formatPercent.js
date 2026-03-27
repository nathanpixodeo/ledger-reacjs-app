export function formatPercent(value) {
  if (value == null || isNaN(value)) return '0%';
  return `${Number(value).toFixed(1).replace('.', ',')}%`;
}
