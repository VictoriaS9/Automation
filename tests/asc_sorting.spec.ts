import { test, expect } from '@playwright/test';

// Utility function to check if array is sorted ascending
function isSortedAsc(arr: string[]) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1].localeCompare(arr[i]) > 0) return false;
  }
  return true;
}

test.describe('Product sorting by name', () => {
  const testCases = [
    { label: 'Name (A - Z)', isSorted: isSortedAsc },
  ];

  for (const { label, isSorted } of testCases) {
    test(`Verify sorting by ${label}`, async ({ page }) => {
      await page.goto('/');
      const sortDropdown = page.getByTestId('sort');
      await expect(sortDropdown).toBeVisible();
      const productNameLocators = page.getByTestId('product-name');
      const initialProductNames = await productNameLocators.allTextContents();

      await sortDropdown.selectOption({ value: 'name,asc' });

      // Wait for the product list to change (instead of timeout)
      await expect.poll(async () => {
        return await productNameLocators.allTextContents();
      }, {
        timeout: 3000,
        message: 'Waiting for sorted product list to load'
      }).not.toEqual(initialProductNames);

      const finalProductNames = await productNameLocators.allTextContents();
      expect(isSorted(finalProductNames)).toBeTruthy();
    });
  }
});
