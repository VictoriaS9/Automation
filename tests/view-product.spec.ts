import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

if (process.env.CI === 'true') {
  console.log('⏭️ Skipping test in CI');
}

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productName = 'Combination Pliers';
  const expectedPrice = '14.15';

  await test.step('Navigate to home page', async () => {
    await homePage.navigateToHomePage();
  });

  await test.step(`Open product "${productName}"`, async () => {
    await homePage.openProductByName(productName);
  });

  await test.step('Verify product details', async () => {
    await homePage.verifyProductDetails(productName, expectedPrice);
  });

  await test.step('Verify "Add to Cart" button is visible', async () => {
    await homePage.verifyAddToCartButtonVisible();
  });

  await test.step('Verify "Add to Favorites" button is visible', async () => {
    await homePage.verifyAddToFavoritesButtonVisible();
  });
});
