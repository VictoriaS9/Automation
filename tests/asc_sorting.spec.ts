import { test, expect } from '@playwright/test';
import { isSortedAsc } from './helpers/sortUtils.js'; 
import { HomePage } from '../pages/home.page';  

test.describe('@smoke Product sorting by name', () => {
  const testCases = [
    { label: 'Name (A - Z)', sortValue: 'name,asc', isSorted: isSortedAsc },
  ];

  for (const { label, sortValue, isSorted } of testCases) {
    test(
      `Verify sorting by ${label}`,
      { tag: ['@smoke'] },
      async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.navigateToHomePage();
        await homePage.verifySortDropdownVisible();
        const initialProductNames = await homePage.getAllProductNames();

        await homePage.selectSortOption(sortValue);

        const finalProductNames = await homePage.waitForProductNamesToChange(initialProductNames);

        expect(isSorted(finalProductNames)).toBeTruthy();
      }
    );
  }
});
