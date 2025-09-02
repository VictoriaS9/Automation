// tests/helpers/sortUtils.ts

/**
 * Checks if an array of strings is sorted in ascending (A-Z) order.
 */
export function isSortedAsc(arr: string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1].localeCompare(arr[i]) > 0) return false;
  }
  return true;
}
