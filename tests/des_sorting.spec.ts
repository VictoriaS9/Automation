import { test, expect } from '@playwright/test';
function isSortedDesc(arr: string[]): boolean {
  return [...arr].every((v, i, a) => i === 0 || a[i - 1].localeCompare(v) >= 0);
}

test.describe('Product sorting by name', () => {
  const testCases = [
    { label: 'Name (Z - A)', isSorted: isSortedDesc }
  ];

  for (const { label, isSorted } of testCases) {
    test(`Verify sorting by ${label}`, async ({ page }) => {
      await page.goto('/');
      const sortDropdown = page.getByTestId('sort');
      await expect(sortDropdown).toBeVisible();

      const productNameLocators = page.getByTestId('product-name');
      const initialProductNames = await productNameLocators.allTextContents();

      await sortDropdown.selectOption({ value: 'name,desc' });
      await expect.poll(async () => {
        return await productNameLocators.allTextContents();
      }, {
        timeout: 3000,
        message: 'Waiting for sorted product list to update (Z - A)'
      }).not.toEqual(initialProductNames);

      const finalProductNames = await productNameLocators.allTextContents();
      expect(isSorted(finalProductNames)).toBeTruthy();
    });
  }
});
