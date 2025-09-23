import { Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

export class App {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly loginPage: LoginPage;
  readonly accountPage: AccountPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
    this.accountPage = new AccountPage(page);
  }
  async login(email: string, password: string) {
    await this.loginPage.gotoLoginPage();
    await this.loginPage.performLogin(email, password);
  }
}
