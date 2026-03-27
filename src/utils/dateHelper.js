const MONTH_NAMES_VI = [
  'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
  'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12',
];

export function getMonthLabel(month) {
  return MONTH_NAMES_VI[month - 1] || `Th${month}`;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getYearOptions(startYear = 2020) {
  const currentYear = getCurrentYear();
  const years = [];
  for (let y = currentYear; y >= startYear; y--) {
    years.push(y);
  }
  return years;
}
