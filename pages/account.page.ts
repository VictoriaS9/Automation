import {Locator, Page} from "@playwright/test";
import { BasePage } from "./base.page";
import { expect } from '@playwright/test';  
export class AccountPage extends BasePage {
    page: Page;
    welcomeMessage: Locator;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.welcomeMessage = this.page.getByTestId('page-title');
    }
    
    async verifyWelcomeMessage(expectedName: string): Promise<void> {
        await expect(this.welcomeMessage).toContainText(expectedName);
    }
}