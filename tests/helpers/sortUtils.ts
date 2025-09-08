// tests/helpers/sortUtils.ts

/**
 * Checks if a string array is sorted in ascending order (A → Z).
 */
export function isSortedAsc(arr: string[]): boolean {
  return arr.every((val, i, a) => i === 0 || a[i - 1].localeCompare(val) <= 0);
}

/**
 * Checks if a string array is sorted in descending order (Z → A).
 */
export function isSortedDesc(arr: string[]): boolean {
  return arr.every((val, i, a) => i === 0 || a[i - 1].localeCompare(val) >= 0);
}

/**
 * Checks if a numeric array is sorted in descending order (high → low).
 */
export function isNumericSortedDesc(arr: number[]): boolean {
  return arr.every((val, i, a) => i === 0 || a[i - 1] >= val);
}

/**
 * Converts a string price (e.g. "$29.99") to a number (29.99).
 */
export function parsePrice(priceText: string): number {
  return parseFloat(priceText.replace(/[^0-9.]/g, ''));
}
// tests/helpers/sortUtils.ts

export function isNumericSortedAsc(arr: number[]): boolean {
  return arr.every((val, i, a) => i === 0 || a[i - 1] <= val);
}

