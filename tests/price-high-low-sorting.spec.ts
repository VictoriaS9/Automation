import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

function isSortedDesc(arr: number[]): boolean {
  return arr.every((val, i, a) => i === 0 || a[i - 1] >= val);
}

function parsePrice(priceText: string): number {
  return parseFloat(priceText.replace(/[^0-9.]/g, ''));
}

test.describe('Product sorting by price', () => {
  const testCases = [
    {
      label: 'Price (High - Low)',
      sortValue: 'price,desc',
      isSorted: isSortedDesc
    }
  ];

  for (const { label, sortValue, isSorted } of testCases) {
    test(`Verify sorting by ${label}`, async ({ page }) => {
    const homePage = new HomePage(page);

      await homePage.navigateToHomePage();
      await homePage.verifySortDropdownVisible();
      const initialPriceStrings = await homePage.getAllProductPrices();

      await homePage.selectSortOption(sortValue);
      const finalPriceStrings = await homePage.waitForProductPricesToChange(initialPriceStrings);

      const finalPrices = finalPriceStrings.map(parsePrice);

      expect(isSorted(finalPrices)).toBeTruthy();

    });
  }
});
