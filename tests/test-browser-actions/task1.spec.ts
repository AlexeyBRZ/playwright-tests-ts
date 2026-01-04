// Task1: Для сайта https://books-pwakit.appspot.com/ найти:
// 1. Локатор для строки "Search the world's most comprehensive index of full-text books."
// 2. Проверить что текст совпадает с ожидаемым

import { test, expect } from "@playwright/test";

test("check correct text on Books site", async ({ page }) => {
  await page.goto("https://books-pwakit.appspot.com/", { waitUntil: "load" });
  await expect(page.locator('[class="books-desc"]')).toContainText(
    "Search the world's most comprehensive index of full-text books.",
  );
});
