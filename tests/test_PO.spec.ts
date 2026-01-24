import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/page_object/login_page.js";
import { InventoryPage } from "../src/page_object/inventory_page.js";
import { CartPage } from "../src/page_object/cart_page.js";
import { Footer } from "../src/page_object/footer.js";
import { Header } from "../src/page_object/header.js";
import { CheckoutStepOnePage } from "../src/page_object/checkout-step-one_page.js";
import { CheckoutStepTwoPage } from "../src/page_object/checkout-step-two_page.js";

//import { Constants } from '../src/page_object/constants.js'

test.describe("Saucedemo E2E Tests", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let footer: Footer;
  let header: Header;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    footer = new Footer(page);
    header = new Header(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);

    await loginPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("should open inventory page and verify items are displayed", async ({
    page,
  }) => {
    await expect(page).toHaveURL(/.*inventory\.html/);
    const itemsCount = await inventoryPage.getInventoryItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
  });

  test("check footer on checkout-step-one page", async () => {
    await inventoryPage.addToCartByIndex(1);
    await header.clickOnCartIcon();
    await expect(footer.twitterIcon).toBeVisible();
    await expect(footer.facebookIcon).toBeVisible();
    await expect(footer.linkedInIcon).toBeVisible();
    const copyrightText = await footer.getCopyrightText();
    expect(copyrightText).toMatch(/Swag Labs|©/i);
  });

  test("check logout from sidebar", async () => {
    await header.openBurgerMenu();
    await header.clickLogout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test("check finish button in checkout two page", async ({ page }) => {
    await inventoryPage.addToCartByIndex(0);
    await header.clickOnCartBadge();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCheckoutForm("User", "Test User", 229);
    await expect(checkoutStepTwoPage.finishBtn).toBeVisible();
  });
});
