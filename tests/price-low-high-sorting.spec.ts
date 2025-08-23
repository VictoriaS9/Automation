import { test, expect } from '@playwright/test';

// Utility to check if an array of numbers is sorted ascending
function isSortedAsc(arr: number[]): boolean {
  return arr.every((val, i, a) => i === 0 || a[i - 1] <= val);
}

// Helper to parse price string to number, e.g. "$19.99" => 19.99
function parsePrice(priceText: string): number {
  return parseFloat(priceText.replace(/[^0-9.]/g, ''));
}

test.describe('Product sorting by price', () => {
  const testCases = [
    {
      label: 'Price (Low - High)',
      sortValue: 'price,asc',
      isSorted: isSortedAsc
    }
  ];

  for (const { label, sortValue, isSorted } of testCases) {
    test(`Verify sorting by ${label}`, async ({ page }) => {
      await page.goto('https://practicesoftwaretesting.com');

      const sortDropdown = page.getByTestId('sort');
      await expect(sortDropdown).toBeVisible();

      const productPriceLocators = page.getByTestId('product-price');
      const initialPrices = await productPriceLocators.allTextContents();

      await sortDropdown.selectOption({ value: sortValue });

      // Wait until product prices change after sorting
      await expect.poll(async () => {
        return await productPriceLocators.allTextContents();
      }, {
        timeout: 3000,
        message: `Waiting for sorted product list to update for ${label}`
      }).not.toEqual(initialPrices);

      // Get final price list as numbers
      const finalPriceStrings = await productPriceLocators.allTextContents();
      const finalPrices = finalPriceStrings.map(parsePrice);

      expect(isSorted(finalPrices)).toBeTruthy();
    });
  }
});
