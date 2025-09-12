import { test, expect } from './fixtures/appFixture';

test('Logged in user can add product and checkout', async ({ loggedInApp: app }) => {
    
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
  await expect(page.locator('text=Hello')).toBeVisible(); 
  await checkoutBtn.click();
  const street = page.getByTestId('street');
  await street.fill('Main St 1');
  const city = page.getByTestId('city');
  await city.fill('Kyiv');
  const state = page.getByTestId('state');
  await state.fill('Kyiv');
  const country = page.getByTestId('country');
  await country.fill('Ukraine');
  const postCode = page.getByTestId('postal_code');
  await postCode.fill('02000');
  await checkoutBtn.click();
  await page.locator('[data-test="payment-method"]').selectOption('credit-card');
  const credit_cardN = page.getByTestId('credit_card_number');
  await credit_cardN.fill('1111-1111-1111-1111');
  const today = new Date();
  const month = (today.getMonth() + 4).toString().padStart(2, '0');
  const year = today.getFullYear();
  await page.fill('input[id="expiration_date"]', `${month}/${year}`);
  const cvv = page.getByTestId('cvv');
  await cvv.fill('111');
  const card_holder = page.getByTestId('card_holder_name');
  await card_holder.fill('John Doe');
  const confirmBtn = page.getByRole('button', { name: 'Confirm' });
  await confirmBtn.click();
  await expect(page.locator('[data-test="payment-success-message"]'))
  .toHaveText('Payment was successful');
});
