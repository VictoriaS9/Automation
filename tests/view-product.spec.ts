import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

if (process.env.CI === 'true') {
  console.log('⏭️ Skipping test in CI');
}
test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHomePage();

   const productName = 'Combination Pliers';
  const expectedPrice = '14.15';

  await homePage.navigateToHomePage();

  await homePage.openProductByName(productName);
  await homePage.verifyProductDetails(productName, expectedPrice);

  // Optional: check that buttons are visible
  await homePage.verifyAddToCartButtonVisible();
  await homePage.verifyAddToFavoritesButtonVisible();
});
