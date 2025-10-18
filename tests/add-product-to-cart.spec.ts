import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('User can add "Slip Joint Pliers" to cart', { tag: ['@smoke'] }, async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('Navigate to home page', async () => {
    await homePage.navigateToHomePage();
  });

  await test.step('Open product "Slip Joint Pliers"', async () => {
    await homePage.openProductByName('Slip Joint Pliers');
  });

  await test.step('Verify product details', async () => {
    await homePage.verifyProductDetails('Slip Joint Pliers', '9.17');
  });

  await test.step('Add product to cart', async () => {
    await homePage.addProductToCart();
  });

  await test.step('Verify product added to cart alert', async () => {
    await homePage.verifyProductAddedToCartAlert();
  });

  await test.step('Verify cart count is 1', async () => {
    await homePage.verifyCartCount('1');
  });

  await test.step('Go to cart', async () => {
    await homePage.goToCart();
  });

  await test.step('Verify on cart page', async () => {
    await homePage.verifyOnCartPage();
  });

  await test.step('Verify cart item is "Slip Joint Pliers"', async () => {
    await homePage.verifyCartItem('Slip Joint Pliers');
  });

  await test.step('Proceed to checkout', async () => {
    await homePage.proceedCheckout();
  });
});
