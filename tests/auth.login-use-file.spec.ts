import { test, expect } from '@playwright/test';
import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test.use({
  storageState: authFile,
});
test('Verify login with valid credentials',async ({ page }) =>  {  
    await page.goto('/');
    await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');

  //await page.locator('.btnSubmit').click();


});



