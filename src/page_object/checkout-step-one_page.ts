import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page.js";

export class CheckoutStepOnePage extends BasePage {
  readonly cancelButton: Locator;
  readonly firstNameInputField: Locator;
  readonly lastNameInputField: Locator;
  readonly zipPostalCodeInputField: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page, "https://www.saucedemo.com/checkout-step-one.html");
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.firstNameInputField = page.locator('[data-test="firstName"]');
    this.lastNameInputField = page.locator('[data-test="lastName"]');
    this.zipPostalCodeInputField = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async fillCheckoutForm(firstname: string, lastname: string, zipCode: number) {
    await this.firstNameInputField.fill(firstname);
    await this.lastNameInputField.fill(lastname);
    await this.zipPostalCodeInputField.fill(zipCode.toString());
    await this.continueButton.click();
  }
}
