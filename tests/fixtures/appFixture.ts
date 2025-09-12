import { test as base } from '@playwright/test';
import { App } from '../app';
import path from 'path';
import fs from 'fs';

const authDir = path.join(__dirname, '../playwright/.auth');
const authFile = path.join(authDir, 'user.json');

export const test = base.extend<{
  app: App;
  loggedInApp: App;
}>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },

  loggedInApp: async ({ browser }, use) => {
    console.log('📁 Auth file path:', authFile);

    let context;

    if (fs.existsSync(authFile)) {
      console.log('✅ Auth file exists, using saved login');
      context = await browser.newContext({ storageState: authFile });
    } else {
      console.log('❌ Auth file missing, performing login...');
      context = await browser.newContext();
      const page = await context.newPage();
      const app = new App(page);

      await app.loginPage.gotoLoginPage();
      await app.loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

      await page.waitForURL('**/account');
      await page.waitForTimeout(1000); // Дати час бекенду поставити куку

      const cookies = await context.cookies();
      console.log('🍪 Cookies after login:', cookies.map(c => c.name));

      if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true });
      }

      await context.storageState({ path: authFile });
      console.log('💾 Auth file saved');

      await page.close();
    }

    const page = await context.newPage();
    const app = new App(page);
    await use(app);
    await context.close();
  },
});

export { expect } from '@playwright/test';
