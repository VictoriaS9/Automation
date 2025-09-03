import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

function isSortedDesc(arr: string[]): boolean {
  return [...arr].every((v, i, a) => i === 0 || a[i - 1].localeCompare(v) >= 0);
}

test.describe('Product sorting by name', () => {
  const testCases = [
    { label: 'Name (Z - A)', sortValue: 'name,desc', isSorted: isSortedDesc }
  ];

  for (const { label, sortValue, isSorted } of testCases) {
    test(`Verify sorting by ${label}`, async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.navigateToHomePage();
      await homePage.verifySortDropdownVisible();

      const initialProductNames = await homePage.getAllProductNames();

      await homePage.selectSortOption(sortValue);

      const finalProductNames = await homePage.waitForProductNamesToChange(initialProductNames);

      expect(isSorted(finalProductNames)).toBeTruthy();
    });
  }
});
