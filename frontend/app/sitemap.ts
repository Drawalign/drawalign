import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import {
	absoluteSiteUrl,
	localePrefix,
	type PathnameKey,
	resolveLocalizedPathname,
} from "@/lib/i18n-paths";
import { getAllPages, getArticles } from "@/lib/strapi";
import type { ArticleCard, Page } from "@/type";

const STATIC_ROUTES: PathnameKey[] = [
	"/",
	"/expertises",
	"/methode-hldb",
	"/solutions",
	"/partenaires",
	"/contact",
	"/ressources",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const entries: MetadataRoute.Sitemap = [];

	// Static routes — both locales, using each locale's translated slug
	for (const locale of routing.locales) {
		for (const route of STATIC_ROUTES) {
			entries.push({
				url: absoluteSiteUrl(resolveLocalizedPathname(route, locale)),
				changeFrequency: "weekly",
				priority: route === "/" ? 1.0 : 0.8,
			});
		}
	}

	// Dynamic pages (page builder) — both locales
	for (const locale of routing.locales) {
		let pages: Page[] = [];
		try {
			pages = await getAllPages(locale);
		} catch {
			// Strapi unavailable during build
		}
		for (const page of pages) {
			entries.push({
				url: absoluteSiteUrl(`${localePrefix(locale)}/${page.slug}`),
				lastModified: page.updatedAt,
				changeFrequency: "weekly",
				priority: 0.7,
			});
		}
	}

	// Articles — both locales, under the locale's translated "ressources" base path
	for (const locale of routing.locales) {
		let articles: ArticleCard[] = [];
		try {
			articles = await getArticles(locale);
		} catch {
			// Strapi unavailable during build
		}
		const ressourcesBase = resolveLocalizedPathname("/ressources", locale);
		for (const article of articles) {
			entries.push({
				url: absoluteSiteUrl(`${ressourcesBase}/${article.slug}`),
				changeFrequency: "monthly",
				priority: 0.6,
			});
		}
	}

	return entries;
}
