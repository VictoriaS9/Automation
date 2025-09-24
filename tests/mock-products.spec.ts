import { test, expect } from '@playwright/test';

test('Мокує /products та перевіряє 20 товарів на сторінці', async ({ page }) => {
  // Створюємо 20 мок товарів
  const mockedProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: (i + 1) * 10,
    description: `Description for product ${i + 1}`,
    imageUrl: `https://placehold.it/150x150?text=Product+${i + 1}`,
  }));

  // Мок відповіді для API /products
  await page.route('https://api.practicesoftwaretesting.com/products', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockedProducts),
    })
  );

  // Відкриваємо сторінку з товарами (постав свій URL)
  await page.goto('https://practicesoftwaretesting.com');

  // Очікуємо появу елементів товарів на сторінці.
  // Замінити селектор на актуальний для картки товару у твоєму UI
 const productCardSelector = '.card-body';


  await page.waitForSelector(productCardSelector);

  // Перевіряємо, що відображено саме 20 товарів
  const productCards = page.locator(productCardSelector);
  await expect(productCards).toHaveCount(20);
});
