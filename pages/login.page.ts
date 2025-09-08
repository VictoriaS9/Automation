import {Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    page: Page;
    emailField: Locator;
    passwordField: Locator;
    constructor(page: Page){
    
        super(page);
        this.page = page;
        this.emailField = this.page.locator('input[formcontrolname="email"]');
        this.passwordField = this.page.locator('input[type="password"]');
    }

    async gotoLoginPage(): Promise<void> {
    await this.page.goto('/auth/login');
  }

    
    async performLogin(email:string, password: string):Promise<void> {
         await this.emailField.fill(email);
         await this.passwordField.fill(password);
         await this.page.locator('.btnSubmit').click();
    }
 
};