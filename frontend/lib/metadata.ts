import type { Metadata } from "next";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { Seo } from "@/type";

export function buildPageMetadata(pageSeo?: Seo | null, globalSeo?: Seo | null): Metadata {
	const title = pageSeo?.metaTitle || undefined;
	const description = pageSeo?.metaDescription || globalSeo?.metaDescription || undefined;
	const ogImage = pageSeo?.ogImage || globalSeo?.ogImage;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
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
