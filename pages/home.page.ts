import {Locator, Page } from "@playwright/test";
import { expect } from '@playwright/test';
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    page: Page;
    welcomeMessage: Locator;
    sanderCheckbox: Locator;
    productNames: Locator;
    navLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.welcomeMessage = this.page.getByTestId('nav-home');
        this.sanderCheckbox = this.page.getByRole('checkbox', { name: 'Sander' });
        this.productNames = this.page.getByTestId('product-name');
        this.navLocator = this.page.locator('nav');


    }
    async navigateToHomePage(): Promise<void> {
    await this.page.goto('/');
  }

    async openProductByName(productName: string): Promise<void> {
    const productHeading = this.page.getByRole('heading', { name: productName });
    await productHeading.click();
    await expect(this.page).toHaveURL(/\/product\//);
    }
    
    async verifyProductDetails(expectedName: string, expectedPrice: string): Promise<void> {
    const title = this.page.getByRole('heading', { name: expectedName });
    const price = this.page.getByTestId('unit-price');

    await expect(title).toBeVisible();
    await expect(price).toHaveText(expectedPrice);
  }
  async addProductToCart(): Promise<void> {
    const addButton = this.page.getByRole('button', { name: 'Add to cart' });
    await addButton.click();
  }

  async verifyProductAddedToCartAlert(): Promise<void> {
    const alert = this.page.getByText('Product added to shopping cart');
    await expect(alert).toBeVisible();
    await expect(alert).toBeHidden({ timeout: 8000 });  }

  async verifyCartCount(expectedCount: string): Promise<void> {
    const cartCount = this.page.getByTestId('cart-quantity');
    await expect(cartCount).toHaveText(expectedCount);
  }

  async goToCart(): Promise<void> {
    const cartLink = this.page.getByRole('link', { name: 'cart' });
    await cartLink.click();
  }
  async verifyOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL('/checkout');
  }

  async verifyCartItem(expectedProductTitle: string): Promise<void> {
    const cartItemTitle = this.page.getByTestId('product-title');
    await expect(cartItemTitle).toContainText(expectedProductTitle);

    const cartTableRows = this.page.getByTestId('nav-cart');
    await expect(cartTableRows).toHaveCount(1);
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
  async selectSortOption(value: string): Promise<void> {
    const sortDropdown = this.page.getByTestId('sort');
    await sortDropdown.selectOption({ value });
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.page.getByTestId('product-name').allTextContents();
  }
   async verifySortDropdownVisible(): Promise<void> {
    const sortDropdown = this.page.getByTestId('sort');
    await expect(sortDropdown).toBeVisible();
  }
 async waitForProductNamesToChange(previousNames: string[]): Promise<string[]> {
  const productNameLocators = this.page.getByTestId('product-name');
  let currentNames: string[] = [];

  await expect.poll(async () => {
    currentNames = await productNameLocators.allTextContents();
    return currentNames.join(',');
  }, {
    timeout: 3000,
    message: 'Waiting for sorted product list to load',
  }).not.toBe(previousNames.join(','));

  return currentNames;

}
async getAllProductPrices(): Promise<string[]> {
    return await this.page.getByTestId('product-price').allTextContents();
  }
  async waitForProductPricesToChange(previousPrices: string[]): Promise<string[]> {
    const productPriceLocators = this.page.getByTestId('product-price');

    await expect.poll(async () => {
      const currentPrices = await productPriceLocators.allTextContents();
      return currentPrices.join(',');
    }, {
      timeout: 3000,
      message: 'Waiting for sorted product prices to update',
    }).not.toBe(previousPrices.join(','));

    return await productPriceLocators.allTextContents();
  }
  async verifyAddToCartButtonVisible(): Promise<void> {
  const addButton = this.page.getByRole('button', { name: 'Add to cart' });
  await expect(addButton).toBeVisible();
}

async verifyAddToFavoritesButtonVisible(): Promise<void> {
  const favButton = this.page.getByRole('button', { name: /Add to favourites/i });
  await expect(favButton).toBeVisible();
}

async verifyLoggedInUserName(expectedName: string): Promise<void> {
  const navMenu = this.page.getByTestId('nav-menu');
  await expect(navMenu).toContainText(expectedName);
}



}