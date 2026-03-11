import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/strapi";
import type { Page } from "@/type";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	let pages: Page[] = [];
	try {
		pages = await getAllPages();
	} catch {
		// Strapi unavailable during build — return empty sitemap
	}

	return pages.map((page) => ({
		url: `${baseUrl}/${page.slug}`,
		lastModified: page.updatedAt,
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));
}
