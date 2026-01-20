import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page.js";

export class CheckoutStepTwoPage extends BasePage {
  readonly finishBtn: Locator;

  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/checkout-step-two.html");
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async clickFinishBtn() {
    await this.finishBtn.click();
  }

  getFinishBtn() {
    return {
      finishBtn: this.finishBtn,
    };
  }
}
