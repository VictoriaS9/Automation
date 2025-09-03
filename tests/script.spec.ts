import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { AccountPage } from '../pages/account.page';

test('Verify login with valid credentials',  {
  tag: '@login',
}, async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page); 
  const accountPage = new AccountPage(page);
  const EMAIL = 'customer@practicesoftwaretesting.com';
  const PASSWORD = 'welcome01';
  await page.goto('/auth/login');
  await loginPage.performLogin(EMAIL, PASSWORD)
  await homePage.verifyWelcomeMessage('Home');
  await accountPage.verifyWelcomeMessage('My account');
  await accountPage.verifyOnAccountPage();
  await accountPage.verifyPageTitle('My account');
  await accountPage.verifyLoggedInUser('Jane Doe');


});

