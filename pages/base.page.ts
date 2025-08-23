import { Page } from "@playwright/test";

export class BasePage {
constructor(readonly page: Page) {

}

async navigate(path: string): Promise<void> {
    await this.page.goto(path);  
}
}