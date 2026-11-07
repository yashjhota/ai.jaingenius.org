/** Display formatting helpers. */

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  // Content dates are written as plain YYYY-MM-DD, parsed as UTC midnight.
  timeZone: 'UTC',
});

/** "7 Nov 2026". */
export const formatDate = (date: Date) => dateFormatter.format(date);

/** Machine-readable date for <time datetime>: "2026-11-07". */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Human-readable file size using 1024-byte units: "512 B", "1.5 KB", "3.2 MB". */
export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return 'Unknown size';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  const rounded = unit === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${rounded} ${units[unit]}`;
}
