import type { MetadataRoute } from "next";
import { getAllPages } from "@/lib/strapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = await getAllPages();
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

	return pages.map((page) => ({
		url: `${baseUrl}/${page.slug}`,
		lastModified: page.updatedAt,
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));
}
