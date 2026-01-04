// Task8: Для сайта https://the-internet.herokuapp.com/javascript_alerts
// 1. Вызвать JS confirm через соответствующую опцию (проверить что алерт появился)
// 2. Закрыть его через accept/dismiss и проверить результат

import { test, expect } from "@playwright/test";

test("js confirm test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator(`[onclick="jsConfirm()"]`).click();
  await expect(page.locator("[id=result]")).toContainText("You clicked: Ok");
});
