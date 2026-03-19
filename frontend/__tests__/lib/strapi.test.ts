import { beforeEach, describe, expect, it, vi } from "vitest";
import { getStrapiImageUrl } from "@/lib/strapi";

describe("getStrapiImageUrl", () => {
	it("returns absolute URLs unchanged", () => {
		expect(getStrapiImageUrl("https://cdn.example.com/img.png")).toBe(
			"https://cdn.example.com/img.png",
		);
	});

	it("prepends STRAPI_URL for relative paths", () => {
		expect(getStrapiImageUrl("/uploads/img.png")).toBe("http://localhost:1337/uploads/img.png");
	});
});

describe("fetchAPI", () => {
	beforeEach(() => {
		vi.resetModules();
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: () => Promise.resolve({ data: [] }),
			}),
		);
	});

	it("uses cache tag for normal requests", async () => {
		const { fetchAPI } = await import("@/lib/strapi");
		await fetchAPI("/pages");
		expect(fetch).toHaveBeenCalledWith(
			"http://localhost:1337/api/pages?locale=fr",
			expect.objectContaining({ next: { tags: ["strapi-content"] } }),
		);
	});

	it("bypasses cache and adds status=draft in draft mode", async () => {
		const { fetchAPI } = await import("@/lib/strapi");
		await fetchAPI("/pages?foo=bar", { draft: true });
		expect(fetch).toHaveBeenCalledWith(
			"http://localhost:1337/api/pages?foo=bar&locale=fr&status=draft",
			expect.objectContaining({ cache: "no-store" }),
		);
	});
});
