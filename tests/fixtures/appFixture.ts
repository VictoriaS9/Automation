import { test as base } from '@playwright/test';
import { App } from '../app';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const USER_EMAIL = process.env.TEST_USER_EMAIL!;
const USER_PASSWORD = process.env.TEST_USER_PASSWORD!;
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
    console.log('📁 Generating new auth file at:', authFile);

    const context = await browser.newContext();
    const page = await context.newPage();
    const app = new App(page);
    await app.loginPage.gotoLoginPage();
    await app.loginPage.performLogin(USER_EMAIL, USER_PASSWORD);

    await page.waitForURL('**/account');
    await page.waitForTimeout(1000); 

    const cookies = await context.cookies();
    console.log('🍪 Cookies after login:', cookies.map(c => c.name));

    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    await context.storageState({ path: authFile });
    console.log('💾 New auth file saved');

    await page.close();

    const newPage = await context.newPage();
    const loggedInApp = new App(newPage);
    await use(loggedInApp);
    await context.close();
  },
});

export { expect } from '@playwright/test';
