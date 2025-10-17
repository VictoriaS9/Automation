import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { isNumericSortedDesc, parsePrice } from './helpers/sortUtils.js';


test.describe('@regression Product sorting by price', () => {
  const testCases = [
    {
      label: 'Price (High - Low)',
      sortValue: 'price,desc',
      isSorted: isNumericSortedDesc
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
