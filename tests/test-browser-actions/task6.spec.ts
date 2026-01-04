// Task6: Для сайта https://the-internet.herokuapp.com/upload
// 1. Проверить загрузку файла test.txt (любой файл) на сайт

import { test, expect } from "@playwright/test";

test("upload file test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");
  await page
    .locator("[id=file-upload]")
    .setInputFiles("tests/test-browser-actions/fileForUpload.txt");
  await page.locator('[id="file-submit"]').click();
  await expect(page.locator('[id="uploaded-files"]')).toContainText(
    "fileForUpload.txt",
  );
});
