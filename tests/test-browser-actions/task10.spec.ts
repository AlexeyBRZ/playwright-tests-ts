// Task10: Для сайта https://the-internet.herokuapp.com/iframe
// 1. Создать тест для проверки кнопок в верхнем меню эдитора (["File", "Edit", "View", "Format"])
// 2. Проверить что кнопки неактивны (disabled)
// 3. Проверить текст в форме ("Your content goes here.")
// 4. (опционально, сложная задача) Сделать возможным редактировать текст в форме.
//    Дописать свое имя в форму и проверить что форма была модифицирована

import { test, expect } from "@playwright/test";

test("upload file test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/iframe");
  await expect(page.getByText("File")).toBeDisabled;
  await expect(page.getByText("Edit")).toBeDisabled;
  await expect(page.getByText("View")).toBeDisabled;
  await expect(page.getByText("Format")).toBeDisabled;
  await page.locator(".tox-notification__dismiss").click();
  //await page.locator('[//div[@role="alert"]//button[@type="button"]').click()
  const frame = await page.frameLocator('[id="mce_0_ifr"]');
  await expect(frame.locator("[id=tinymce]")).toContainText(
    "Your content goes here.",
  );
});
