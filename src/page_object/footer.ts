import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page.js";

export class Footer extends BasePage {
  readonly twitterIcon: Locator;
  readonly facebookIcon: Locator;
  readonly linkedInIcon: Locator;
  readonly copyrightNotice: Locator;

  constructor(page: Page) {
    super(page);
    this.twitterIcon = page.locator('[data-test="social-twitter"]');
    this.facebookIcon = page.locator('[data-test="social-facebook"]');
    this.linkedInIcon = page.locator('[data-test="social-linkedin"]');
    this.copyrightNotice = page.locator('[data-test="footer-copy"]');
  }

  getSocialIcons() {
    return {
      twitter: this.twitterIcon,
      facebook: this.facebookIcon,
      linkedin: this.linkedInIcon,
    };
  }

  async getCopyrightText(): Promise<string> {
    return this.copyrightNotice.innerText();
  }
}
