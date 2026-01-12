import { test } from "@playwright/test";
import { expect } from "../libs/asserts/custom-asserts.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
});

test("response test", async ({ page }) => {
  const response = await page.request.get(
    "https://www.saucedemo.com/?/inventory.html",
  );
  const status = response.status();
  expect(status).toBe(200);
});

test("if low to high sort is hidded", async ({ page }) => {
  await expect(
    page.locator(
      '//*[@data-test="product-sort-container"]//option[@value="lohi"]',
    ),
  ).toBeHidden();
});

test("if cart page is opened", async ({ page }) => {
  await page.locator('[data-test="shopping-cart-link"]').click();
  expect(page).toHaveURL(/cart\.html$/);
});

test("if color changes on Hover", async ({ page }) => {
  const linkToItem = await page.locator(
    '//*[@data-test="item-4-title-link"]//*[@data-test="inventory-item-name"]',
  );
  await expect(linkToItem).toChangeColorOnHover();
});

test("screenshot test", async ({ page }) => {
  await expect(page).toHaveScreenshot();
});

test("check error for checkout without last name", async ({ page }) => {
  await page.context().tracing.start({ screenshots: true, snapshots: true });
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator(`//*[@data-test="checkout"]`).click();
  await page.locator('[data-test="continue"]').click();
  page.locator('[data-test="error-button"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill("first_name");
  await page.locator('[data-test="continue"]').click();
  await page.context().tracing.stop({ path: "test-tracing-1.zip" });
  await expect(
    page.locator(
      '//h3[@data-test="error" and text()="Error: Last Name is required"]',
    ),
  ).toBeVisible();
});
