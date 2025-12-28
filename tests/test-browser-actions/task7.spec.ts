// Task7: Для сайта https://the-internet.herokuapp.com/download
// 1. Скачать файл sample_upload.txt
// 2. Проверить что его содержимое это "This is a test file for Selenium upload automation."

import { test, expect } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

test("download file test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/download");
  const downloadPromise = page.waitForEvent("download");
  const fileName = "fileForUpload.txt";
  await page.getByText(fileName).click();
  const download = await downloadPromise;
  const downloadDir = "tests/test-browser-actions";
  const filePath = path.join(downloadDir, await download.suggestedFilename());
  await download.saveAs(filePath);
  expect(fs.existsSync(filePath)).toBe(true);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  expect(fileContent.trim()).toBe("Sample file to test the upload feature");
});
