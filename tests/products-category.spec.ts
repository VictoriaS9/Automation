import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
// Enum for product categories
enum PowerTools {
  Grinder = 'Grinder',
  Sander = 'Sander',
  Saw = 'Saw',
  Drill = 'Drill',
}

test('Verify user can filter products by category (Sander)', async ({ page }) => {
 const homePage = new HomePage(page);
    await homePage.navigate('/');

  // Click on "Power Tools" category to expand it (if necessary)
    //await page.waitForLoadState('networkidle')
    //const responsePromise = page.waitForResponse('https://api.practicesoftwaretesting.com/products?page=0&between=price,1,100&by_category=' + checkboxID);
    await homePage.checkAndWaitforResponse();

  const productNames = await homePage.getAllTextContents(homePage.productNames);
  for (const i of productNames) {
    expect(i).toContain(PowerTools.Sander);
  }


  
//const allProductNames = await productNames.allTextContents();

// Assert at least one contains 'sander'
//expect(allProductNames.some(name => name.toLowerCase().includes('sander'))).toBeTruthy();
});
