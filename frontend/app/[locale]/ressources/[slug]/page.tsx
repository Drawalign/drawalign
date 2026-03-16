import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { PageHero } from "@/components/layout/PageHero";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { buildPageMetadata } from "@/lib/metadata";
import { getArticleBySlug, getGlobal } from "@/lib/strapi";
import type { LocalePageProps } from "@/type";

export async function generateStaticParams() {
	return [];
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale, slug } = await params;
	const [article, global] = await Promise.all([
		getArticleBySlug(slug, { locale }),
		getGlobal(locale),
	]);
	if (!article) return {};

	const pageSeo = { metaTitle: article.title, metaDescription: null, ogImage: article.coverImage };
	return buildPageMetadata(pageSeo, global?.seo);
}

export default async function ArticlePage({ params }: LocalePageProps) {
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
