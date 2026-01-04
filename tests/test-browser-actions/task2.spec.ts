// Task2: Для сайта https://the-internet.herokuapp.com/windows
// 1. Открыть новую страницу
// 2. Проверить что она открылась и имеет ожидаемый ЮРЛ и тайтл

import { test, expect } from "@playwright/test";

test("check correct text on Books site", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/windows");
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Click Here" }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole("heading")).toContainText("New Window");
});
