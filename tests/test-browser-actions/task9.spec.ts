// Task9: Для сайта https://the-internet.herokuapp.com/tables
// 1. Создать скрипт на получение заголовка сайта (title)
// 2. Запустить скрипт через page.evaluate()
// 3. Проверить что полученные title совпадает с ожидаемым

import { test, expect } from "@playwright/test";

test("get site title", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/tables");
  const pageTitle = await page.evaluate(() => {
    return document.title;
  });
  expect(pageTitle).toBe("The Internet");
});
