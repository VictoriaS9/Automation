import { test, expect } from '../fixtures/appFixture';

test('@smoke Logged in user can add product and checkout', async ({ loggedInApp: app }) => {
    
  const { page } = app;
  await page.screenshot({ path: 'tests/debug-context.png' });
  const cookies = await page.context().cookies();
  console.log('Cookies:', cookies.map(c => c.name));
  await page.goto('/'); 
  const productName = page.getByRole('heading', { name: 'Combination Pliers' });
  await productName.click();
  const addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  await addToCartButton.click();
  const addToCart= page.getByRole('link', { name: 'cart' });
  await addToCart.click();
  await expect (page.locator('.product-title')).toContainText('Combination Pliers');
  await expect (page.getByTestId('line-price')).toContainText('14.15');
  await expect (page.getByTestId('cart-total')).toContainText('14.15');
  const checkoutBtn = page.getByRole('button', { name: 'Proceed to checkout' })
  await checkoutBtn.click();
  await expect(page).toHaveURL(/.*\/checkout/);
});
