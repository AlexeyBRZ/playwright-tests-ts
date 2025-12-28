// Task3: Для сайта https://the-internet.herokuapp.com/hovers
// 1. С помощью указателя мыши навестись на любую из картинок
// 2. Проверить, что ожидаемый текст под картинкой появился

import { test, expect } from "@playwright/test";

test("check correct text on hover", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/hovers");
  await page
    .locator(`//a[@href='/users/3']/ancestor::div[@class='figure']/img`)
    .hover();
  const textLocator = page.locator(
    `//a[@href='/users/3']/preceding-sibling::h5`,
  );
  await expect(textLocator).toHaveText("name: user3");
});
