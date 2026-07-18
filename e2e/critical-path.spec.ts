import { expect, test } from "@playwright/test";

test.describe("critical path", () => {
  test("home, project role-simulator, member, optional en", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText(/BIFROST/i).first()).toBeVisible();

    await page.goto("/project");
    await expect(page.getByText(/DecisionLoop/i).first()).toBeVisible();
    const sim = page.getByTestId("role-simulator");
    await expect(sim).toBeVisible();

    const tabs = sim.getByRole("tab");
    await expect(tabs).toHaveCount(4);

    const firstField = sim.locator(".role-sim__field dd").first();
    const textBefore = (await firstField.textContent()) ?? "";

    await tabs.nth(1).click();
    await expect
      .poll(async () => (await firstField.textContent()) ?? "")
      .not.toBe(textBefore);
    const textAfterSecond = (await firstField.textContent()) ?? "";

    await tabs.nth(2).click();
    await expect
      .poll(async () => (await firstField.textContent()) ?? "")
      .not.toBe(textAfterSecond);

    await page.goto("/team/kuang-xuan");
    await expect(page.locator("main")).toBeVisible();

    await page.goto("/en");
    await expect(page.getByText(/BIFROST/i).first()).toBeVisible();
  });
});
