const { test, expect } = require("@playwright/test");

test("shell shows the product name", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kestrel");
});
