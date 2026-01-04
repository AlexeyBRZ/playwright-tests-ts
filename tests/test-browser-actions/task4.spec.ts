// Task4: Для сайта https://the-internet.herokuapp.com/drag_and_drop
// 1. Перетащить элемент А на элемент В
// 2. Проверить что они поменялись местами

import { test, expect } from "@playwright/test";

test("check drag and drop", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
  const imgAHeader = page.locator(`#column-a header`);
  const imgBHeader = page.locator(`#column-b header`);
  const beforeA = await imgAHeader.textContent();
  const beforeB = await imgBHeader.textContent();
  await page.dragAndDrop("#column-a", "#column-b");
  await expect(imgAHeader).toHaveText(beforeB!);
  await expect(imgBHeader).toHaveText(beforeA!);
});
