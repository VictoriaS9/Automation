import { test as base } from '@playwright/test';
import { App } from '../tests/app';
import dotenv from 'dotenv';

dotenv.config();

const USER_EMAIL = process.env.TEST_USER_EMAIL!;
const USER_PASSWORD = process.env.TEST_USER_PASSWORD!;

interface LoginResponse {
  access_token: string; // Adjust if your API returns 'accessToken', etc.
}

export const test = base.extend<{
  app: App;
  loggedInApp: App;
}>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },

  loggedInApp: async ({ browser, request }, use) => {
    // 1. Login to get the token
    const loginResponse = await request.post('https://api.practicesoftwaretesting.com/users/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email: USER_EMAIL,
        password: USER_PASSWORD,
      },
    });

    if (loginResponse.status() !== 200) {
      const errorBody = await loginResponse.text();
      console.error(`❌ Login failed (${loginResponse.status()}): ${errorBody}`);
      throw new Error('Login failed.');
    }

    let loginData: LoginResponse;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      loginData = await loginResponse.json();
    } catch (e) {
      const raw = await loginResponse.text();
      console.error('❌ Failed to parse login response:', e, '\nRaw:', raw);
      throw new Error('Invalid JSON in login response.');
    }

    const token = loginData.access_token;
    if (!token) {
      throw new Error('❌ No token found in login response.');
    }

    // 2. Open browser and inject token into localStorage
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('users/login'); 

    // Set token in localStorage
    await page.evaluate((token) => {
      localStorage.setItem('auth_token', token); 
    }, token);

    // 3. Use the logged-in app
    const loggedInApp = new App(page);
    await use(loggedInApp);

    // 4. Cleanup
    await context.close();
  },
});

export { expect } from '@playwright/test';
