import { test, expect } from '@playwright/test';

test('User can add "Slip Joint Pliers" to cart', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('heading', { name: 'Slip Joint Pliers' }).click();
  expect(page.url()).toContain('https://practicesoftwaretesting.com/product/');
  const productTitle = page.getByRole('heading', { name: 'Slip Joint Pliers' });
  await expect(productTitle).toBeVisible();
  const priceLocator = page.getByTestId('unit-price');
  await expect(priceLocator).toHaveText('9.17');
  await page.getByRole('button', { name: 'Add to cart' }).click();
  const alert = page.getByText('Product added to shopping cart');
  await expect(alert).toBeVisible();
  await expect(alert).toHaveCount(0, { timeout: 9000 });
  const cartCount = page.getByTestId('cart-quantity'); // update selector as needed
  await expect(cartCount).toHaveText('1');
  await page.getByRole('link', {name: 'cart'}).click(); // or getByRole('link', { name: /cart/i }) if applicable
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');

 const cartTableRows = page.getByTestId('nav-cart');
  await expect(cartTableRows).toHaveCount(1);

  const cartItemTitle = page.getByTestId('product-title');
  await expect(cartItemTitle).toContainText('Slip Joint Pliers');

  // 10. Verify "Proceed to Checkout" button is visible
  const checkoutBtn = page.getByRole('button', { name: 'Proceed to Checkout' });
  await expect(checkoutBtn).toBeVisible();

});