import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({
  storageState: authFile,
});

test('Verify login with valid credentials', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('Navigate to home page', async () => {
    await homePage.navigateToHomePage();
  });

  await test.step('Verify logged-in user name is "Jane Doe"', async () => {
    await homePage.verifyLoggedInUserName('Jane Doe');
  });
});
