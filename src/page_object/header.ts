import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page.js";

export class Header extends BasePage {
  readonly shopingCartIcon: Locator;
  readonly shopingCartBadgeDigit: Locator;
  readonly burgerMenu: Locator;
  readonly sideBarLogoutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.shopingCartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.shopingCartBadgeDigit = page.locator(
      '[data-test="shopping-cart-badge"]',
    );
    this.burgerMenu = page.getByRole("button", { name: "Open Menu" });
    this.sideBarLogoutBtn = page.locator('[data-test="logout-sidebar-link"]');
  }

  async clickOnCartIcon() {
    await this.shopingCartIcon.click();
  }
  async openBurgerMenu() {
    await this.burgerMenu.click();
  }

  async clickOnCartBadge() {
    await this.shopingCartBadgeDigit.click();
  }

  async clickLogout() {
    await this.sideBarLogoutBtn.click();
  }
}
