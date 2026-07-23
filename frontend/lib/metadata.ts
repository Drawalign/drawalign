import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import {
	absoluteSiteUrl,
	type Locale,
	type PathnameKey,
	resolveLocalizedPathname,
} from "@/lib/i18n-paths";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { Seo } from "@/type";

export type PagePath = { locale: Locale } & ({ route: PathnameKey } | { pathname: string });

const OG_LOCALES: Record<Locale, string> = { fr: "fr_FR", en: "en_US" };

function buildAlternates(path: PagePath): Metadata["alternates"] {
	if ("pathname" in path) {
		return { canonical: absoluteSiteUrl(path.pathname) };
	}
	const { route, locale } = path;
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, absoluteSiteUrl(resolveLocalizedPathname(route, l))]),
	);
	return {
		canonical: absoluteSiteUrl(resolveLocalizedPathname(route, locale)),
		languages: {
			...languages,
			"x-default": absoluteSiteUrl(resolveLocalizedPathname(route, routing.defaultLocale)),
		},
	};
}

export function buildPageMetadata(
	pageSeo: Seo | null | undefined,
	globalSeo: Seo | null | undefined,
	path: PagePath,
): Metadata {
	const title = pageSeo?.metaTitle || undefined;
	const description = pageSeo?.metaDescription || globalSeo?.metaDescription || undefined;
	const ogImage = pageSeo?.ogImage || globalSeo?.ogImage;
	const alternateLocales = routing.locales
		.filter((l) => l !== path.locale)
		.map((l) => OG_LOCALES[l]);

	return {
		title,
		description,
		alternates: buildAlternates(path),
		openGraph: {
			title,
			description,
			type: "website",
			locale: OG_LOCALES[path.locale],
			alternateLocale: alternateLocales,
			images: ogImage
				? [
						{
							url: getStrapiImageUrl(ogImage.url),
							width: ogImage.width,
							height: ogImage.height,
							alt: ogImage.alternativeText ?? title ?? "",
						},
					]
				: [],
		},
	};
}
