import { test as setup } from "@playwright/test";

setup("log in as problem user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("problem_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  console.log("SETUP RUNNING!");

  await page.context().storageState({ path: "auth/problem-user-state.json" });
});
