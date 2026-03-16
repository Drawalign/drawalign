import type { Metadata } from "next";
import { ArticleListBlock } from "@/components/blocks/ArticleListBlock";
import { PageHero } from "@/components/layout/PageHero";
import { buildPageMetadata } from "@/lib/metadata";
import { getGlobal, getRessourcesPage } from "@/lib/strapi";
import type { LocalePageProps } from "@/type";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const [page, global] = await Promise.all([getRessourcesPage(locale), getGlobal(locale)]);
	return buildPageMetadata(page?.seo, global?.seo);
}

export default async function RessourcesPage({ params }: LocalePageProps) {
	const { locale } = await params;
	const page = await getRessourcesPage(locale);

	if (!page) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p className="text-zinc-500">Ressources page not published yet. (locale: {locale})</p>
			</main>
		);
	}

	return (
		<main>
			{page.hero && (
				<PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} subtitle={page.hero.text} />
			)}
			<ArticleListBlock />
		</main>
	);
}
