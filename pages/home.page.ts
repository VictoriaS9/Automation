import {Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';

export class HomePage {
    page: Page;
    welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeMessage = this.page.getByTestId('nav-home');
    }

    async verifyWelcomeMessage(expectedName: string): Promise<void> {
        await expect(this.welcomeMessage).toContainText(expectedName);
    }
}