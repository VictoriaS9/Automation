
import { test, expect } from '@playwright/test';
import { isSortedAsc } from './helpers/sortUtils.js'; 

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
