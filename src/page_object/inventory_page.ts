import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page.js";

export class InventoryPage extends BasePage {
  readonly InventoryItems: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly itemPrice: Locator;

  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/inventory.html");
    this.InventoryItems = page.locator(".inventory_item");
    this.addToCartButton = page.locator('[data-test^="add-to-cart-"]');
    this.removeButton = page.locator('[data-test^="remove-"]');
    this.itemPrice = page.locator(".inventory_item_price");
  }

  async getInventoryItemsCount(): Promise<number> {
    return await this.InventoryItems.count();
  }

  async addToCartByIndex(index: number) {
    await this.addToCartButton.nth(index).click();
  }
}
