import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
enum PowerTools {
  Grinder = 'Grinder',
  Sander = 'Sander',
  Saw = 'Saw',
  Drill = 'Drill',
}

test('Verify user can filter products by category (Sander)', async ({ page }) => {
 const homePage = new HomePage(page);
    await homePage.navigate('/');
    await homePage.checkAndWaitforResponse();

  const productNames = await homePage.getAllTextContents(homePage.productNames);
  for (const i of productNames) {
    expect(i).toContain(PowerTools.Sander);
  }

});
