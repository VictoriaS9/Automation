import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('User can add "Slip Joint Pliers" to cart', async ({ page }) => {
   const homePage = new HomePage(page);

  await homePage.navigateToHomePage();
  await homePage.openProductByName('Slip Joint Pliers');
  await homePage.verifyProductDetails('Slip Joint Pliers', '9.17');
  await homePage.verifyProductDetails('Slip Joint Pliers', '9.17');
  await homePage.addProductToCart();
  await homePage.verifyProductAddedToCartAlert();
  await homePage.verifyCartCount('1');
  await homePage.goToCart();
  await homePage.verifyOnCartPage();
  await homePage.verifyCartItem('Slip Joint Pliers');
  await homePage.proceedCheckout();
}); 