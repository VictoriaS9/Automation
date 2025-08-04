import { test, expect } from '@playwright/test';

test('Verify login with valid credentials',  {
  tag: '@login',
}, async ({ page }) => {
  await page.goto('/auth/login');
  await page.fill('input[formcontrolname="email"]', 'customer@practicesoftwaretesting.com');
  await page.fill('input[type="password"]', 'welcome01');
  await page.locator('.btnSubmit').click();
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId("page-title")).toHaveText('My account');
  await expect(page.locator('nav')).toContainText('Jane Doe');


});
