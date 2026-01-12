import { test, expect } from "@playwright/test";

const sauceUrl = "https://www.saucedemo.com/";

test.beforeEach(async ({ page }) => {
  await page.goto(sauceUrl);
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
});

test("check checkout btn", async ({ page }) => {
  await page
    .locator(
      `//*[@data-test='inventory-item-name' and contains(text(), 'Bolt T-Shirt')]`,
    )
    .click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="shopping-cart-badge"]').click();
  const checkoutBtn = await page.locator(`//*[@data-test="checkout"]`);
  expect(checkoutBtn).toBeVisible();
});

test("check logout", async ({ page }) => {
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

test("check amount of added items in cart", async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page
    .locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
    .click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    .click();
  const itemAmount = await page
    .locator('[data-test="shopping-cart-badge"]')
    .textContent();
  expect(itemAmount).toEqual("3");
});

test("do items added to cart", async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page
    .locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]')
    .click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
    .click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(
    page.locator('//button[@data-test="remove-sauce-labs-fleece-jacket"]'),
  ).toBeEnabled();
});

test("check error for checkout without last name", async ({ page }) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator(`//*[@data-test="checkout"]`).click();
  await page.locator('[data-test="continue"]').click();
  page.locator('[data-test="error-button"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill("first_name");
  await page.locator('[data-test="continue"]').click();
  await expect(
    page.locator(
      '//h3[@data-test="error" and text()="Error: Last Name is required"]',
    ),
  ).toBeVisible();
});

test("add to cart test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/", { waitUntil: "load" });
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(
    page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
  ).toContainText("Add to cart");
});
