import { test, expect } from "@playwright/test";

test("add to cart test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/", { waitUntil: "load" });
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  const addToCartText = await page
    .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    .textContent();
  expect(addToCartText).toEqual("Add to cart");
});

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill("my name");
  await page.locator('[data-test="continue"]').click();
  await expect(
    page.locator(
      '//h3[@data-test="error" and text()="Error: Last Name is required"]',
    ),
  ).toBeVisible;
});

test("test your cart title", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="item-0-img-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Your Cart");
});

test("check cancel btn in checkout for problem user", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("problem_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.getByText("Rib snap infant onesie for").click();
  await page.locator('[data-test="item-2-img-link"]').click();
  await page.locator('[data-test="add-to-cart"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="cart-desc-label"]').click();
  await page.locator('[data-test="cart-quantity-label"]').click();
  await page.locator('[data-test="checkout"]').click();
  await expect(page.locator('[data-test="cancel"]')).toContainText("Cancel");
});
