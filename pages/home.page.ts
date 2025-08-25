import {Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    page: Page;
    welcomeMessage: Locator;
    sanderCheckbox: Locator;
    productNames: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.welcomeMessage = this.page.getByTestId('nav-home');
        this.sanderCheckbox = this.page.getByRole('checkbox', { name: 'Sander' });
        this.productNames = this.page.getByTestId('product-name');

    }

    async verifyWelcomeMessage(expectedName: string): Promise<void> {
        await expect(this.welcomeMessage).toContainText(expectedName);
    }
    async checkAndWaitforResponse(): Promise<void> {
        const checkboxID = await this.sanderCheckbox.getAttribute('value');

        const responsePromise = this.page.waitForResponse(res =>
            res.url().includes(`by_category=${checkboxID}`));
        await this.sanderCheckbox.check();
        await responsePromise;

    }
    async getAllTextContents(locator:Locator): Promise<string[]> {
        
        return locator.allTextContents();
    }   
   async proceedCheckout(): Promise<void> {
    const checkoutBtn = this.page.getByRole('button', { name: 'Proceed to Checkout' });
    await expect(checkoutBtn).toBeVisible();


}
}