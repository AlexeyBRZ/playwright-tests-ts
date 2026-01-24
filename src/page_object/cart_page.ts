import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page.js";

export class CartPage extends BasePage {
  readonly cartBage: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButton: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;

  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/cart.html");
    this.cartBage = page.locator(".shopping_cart_badge");
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
    this.removeButton = page.locator('[data-test^="remove-"]');
    this.cartItemNames = page.locator(".inventory_item_price");
    this.cartItemPrices = page.locator(".inventory_item_price");
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItemByIndex(index: number) {
    await this.removeButton.nth(index).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
