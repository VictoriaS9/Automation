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

interface LoginResponse {
  token: string; // Adjust if your API returns accessToken or something else
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
    console.log('📁 Generating new auth file at:', authFile);

    // 1. Make API call to your backend login endpoint
    const loginResponse = await request.post('/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        email: USER_EMAIL,
        password: USER_PASSWORD,
      },
    });

    // 2. Check if response status is 200 OK
    if (loginResponse.status() !== 200) {
      const errorBody = await loginResponse.text();
      console.error(`❌ Login failed with status ${loginResponse.status()}`);
      console.error(`🔍 Response body: ${errorBody}`);
      throw new Error('Login API failed. Check endpoint or credentials.');
    }

    // 3. Parse JSON safely
    let loginData: LoginResponse;
    try {
      loginData = await loginResponse.json() as LoginResponse;
    } catch (e) {
      const raw = await loginResponse.text();
      console.error('❌ Failed to parse login response as JSON', e);
      console.error('🔍 Status code:', loginResponse.status());
      console.error('📄 Raw response body:\n', raw);
      throw new Error('Invalid JSON in login response.');
    }

    if (!loginData.token) {
      throw new Error('❌ No token found in login response.');
    }

    const token = loginData.token;

    // 4. Create browser context with localStorage containing token
    const context = await browser.newContext({
      storageState: {
        cookies: [],
        origins: [
          {
            origin: '/', // Change to your app's frontend URL
            localStorage: [
              {
                name: 'auth_token', // Change if your app uses a different key for token in localStorage
                value: token,
              },
            ],
          },
        ],
      },
    });

    // 5. Save storage state for reuse (optional)
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }
    await context.storageState({ path: authFile });
    console.log('💾 Auth file saved to:', authFile);

    // 6. Create a new page and instantiate App with logged in context
    const page = await context.newPage();
    const loggedInApp = new App(page);

    await use(loggedInApp);

    await context.close();
  },
});

export { expect } from '@playwright/test';
