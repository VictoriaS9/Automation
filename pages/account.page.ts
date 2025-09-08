import {Locator, Page} from "@playwright/test";
import { BasePage } from "./base.page";
import { expect } from '@playwright/test';  
export class AccountPage extends BasePage {
    page: Page;
    welcomeMessage: Locator;
    pageTitle: Locator;
  navLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.welcomeMessage = this.page.getByTestId('page-title');
        this.pageTitle = this.page.getByTestId('page-title');
        this.navLocator = this.page.locator('nav');
    }
    
    async verifyWelcomeMessage(expectedName: string): Promise<void> {
        await expect(this.welcomeMessage).toContainText(expectedName);
    }
      async verifyOnAccountPage(): Promise<void> {
    await expect(this.page).toHaveURL('/account');
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }

  async verifyLoggedInUser(expectedName: string): Promise<void> {
    await expect(this.navLocator).toContainText(expectedName);
  }

  async saveAuthState(filePath: string): Promise<void> {
    await this.page.context().storageState({ path: filePath });
  }
}