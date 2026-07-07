export function normalizeDateValue(value) {
  if (!value) return '';

  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) return '';

  const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) {
    return '';
  }

  const date = new Date(parsed);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(value) {
  const normalized = normalizeDateValue(value);
  if (!normalized) return '-';

  const [year, month, day] = normalized.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString('es-AR');
}
