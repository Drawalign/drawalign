import { expect, test } from "@playwright/test";

test("homepage renders a main element", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator("main")).toBeVisible();
});

test("unknown slug returns 404", async ({ page }) => {
	const response = await page.goto("/this-page-does-not-exist-xyz");
	expect(response?.status()).toBe(404);
});
