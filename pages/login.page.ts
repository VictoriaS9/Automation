import {Locator, Page } from "@playwright/test";

export class LoginPage{
    page: Page;
    emailField: Locator;
    passwordField: Locator;
    constructor(page: Page){
        this.page = page;
        this.emailField = this.page.locator('input[formcontrolname="email"]');
        this.passwordField = this.page.locator('input[type="password"]');
    }

    
    async performLogin(email:string, password: string):Promise<void> {
         await this.emailField.fill(email);
         await this.passwordField.fill(password);
         await this.page.locator('.btnSubmit').click();
    }
 
};