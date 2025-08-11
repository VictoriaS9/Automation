import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { AccountPage } from '../pages/account.page';

test('Verify login with valid credentials',  {
  tag: '@login',
}, async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page); 
  const accountPage = new AccountPage(page);// ✅ create an instance

  await page.goto('/auth/login');
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
  await homePage.verifyWelcomeMessage('Home');
  await accountPage.verifyWelcomeMessage('My account');
  //await page.fill('input[formcontrolname="email"]', 'customer@practicesoftwaretesting.com');
  //await page.fill('input[type="password"]', 'welcome01');
  //await page.locator('.btnSubmit').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId("page-title")).toHaveText('My account');
  await expect(page.locator('nav')).toContainText('Jane Doe');


});

