import { expect as baseExpect } from "@playwright/test";
import type { Locator } from "@playwright/test";

export const expect = baseExpect.extend({
  async toChangeColorOnHover(locator: Locator) {
    const colorBefore = await locator.evaluate(
      (el) => window.getComputedStyle(el).color,
    );

    await locator.hover();

    const colorAfter = await locator.evaluate(
      (el) => window.getComputedStyle(el).color,
    );

    const pass = colorBefore !== colorAfter;

    return pass
      ? {
          message: () => `Expected element NOT to change color on hover`,
          pass: true,
        }
      : {
          message: () =>
            `Expected element to change color on hover, but color stayed "${colorBefore}"`,
          pass: false,
        };
  },
});

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toChangeColorOnHover(): R;
    }
  }
}
