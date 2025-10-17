import { test, expect } from '@playwright/test';

import { generateMockProducts } from './helpers/generateMockProducts';



test('@regression Мокує /products та перевіряє 20 товарів на сторінці', async ({ page }) => {

  const mockedProducts = generateMockProducts(20);



  await page.route('https://api.practicesoftwaretesting.com/products*', route =>

    route.fulfill({

      status: 200,

      contentType: 'application/json',

      body: JSON.stringify({data:mockedProducts}),

    })

  );



  await page.goto('https://practicesoftwaretesting.com');



  const productCardSelector = '.card-body'; // Замінити на актуальний селектор



  await page.waitForSelector(productCardSelector);



  const productCards = page.locator(productCardSelector);

  await expect(productCards).toHaveCount(20);

});