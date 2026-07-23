import type { Metadata } from "next";
import { draftMode } from "next/headers";

export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { PageHero } from "@/components/ui/PageHero";
import { type Locale, resolveLocalizedPathname } from "@/lib/i18n-paths";
import { buildPageMetadata } from "@/lib/metadata";
import { getArticleBySlug, getGlobal } from "@/lib/strapi";
import type { LocaleSlugPageProps } from "@/type";

export async function generateStaticParams() {
	return [];
}

export async function generateMetadata({ params }: LocaleSlugPageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	const [article, global] = await Promise.all([
		getArticleBySlug(slug, { locale }),
		getGlobal(locale),
	]);
	if (!article) return {};

	const pageSeo = { metaTitle: article.title, metaDescription: null, ogImage: article.coverImage };
	const pathname = `${resolveLocalizedPathname("/ressources", locale as Locale)}/${slug}`;
	return buildPageMetadata(pageSeo, global?.seo, { pathname, locale: locale as Locale });
}

export default async function ArticlePage({ params }: LocaleSlugPageProps) {
	const { locale, slug } = await params;
	const { isEnabled: isDraft } = await draftMode();
	const article = await getArticleBySlug(slug, { draft: isDraft, locale });

	if (!article) notFound();

	return (
		<main>
			{isDraft && <PreviewBanner />}
			<PageHero title={article.title} />
			<BlockRenderer blocks={article.content ?? []} />
		</main>
	);
}
