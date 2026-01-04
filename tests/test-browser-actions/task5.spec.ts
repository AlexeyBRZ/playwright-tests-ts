// Task5: Для сайта https://the-internet.herokuapp.com/key_presses
// 1. Проверить нажатие клавиши "Control"
// 2. Проверить что отображается последняя буква вашего имени после ввода через клавиатуру

import { test, expect } from "@playwright/test";

test("keypad tests", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/key_presses");
  await page.keyboard.press("Control");
  await expect(page.locator("[id=result]")).toContainText("CONTROL");

  await page.keyboard.type("Alexey");
  await expect(page.locator("[id=result]")).toContainText("Y");
});
