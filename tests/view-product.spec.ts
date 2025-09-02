import { test, expect } from '@playwright/test';
if (process.env.CI === 'true') {
  console.log('⏭️ Skipping test in CI');
}
test('Verify user can view product details', async ({ page }) => {

  await page.goto('https://practicesoftwaretesting.com');
  const productLink = page.getByRole('heading', { name: /Combination Pliers/i });
  await expect(productLink).toBeVisible();
  await productLink.click();
  await expect(productLink).toHaveText('Combination Pliers');
  await expect(page).toHaveURL(/.*product/);
  const productPrice = page.getByTestId('unit-price');
  await expect(productPrice).toHaveText('14.15');
  const AddtoCartButton = page.getByRole('button', { name: 'Add to cart' });
  await expect(AddtoCartButton).toBeVisible();
  const addToFavoritesButton = page.getByRole('button', { name: /Add to favourites/i });
  await expect(addToFavoritesButton).toBeVisible();
  // Step 2: Verify product details
});
