import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';

import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({
  storageState: authFile,
});
test('Verify login with valid credentials',async ({ page }) =>  { 
   const homePage = new HomePage(page);
   await homePage.navigateToHomePage();
   await homePage.verifyLoggedInUserName('Jane Doe');

});



