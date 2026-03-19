import type { Metadata } from "next";
import { FullWidthImage } from "@/components/ui/FullWidthImage";
import { HighlightCard } from "@/components/ui/HighlightCard";
import { PageHero } from "@/components/ui/PageHero";
import { Quote } from "@/components/ui/Quote";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ThreeColCards } from "@/components/ui/ThreeColCards";
import { buildPageMetadata } from "@/lib/metadata";
import { getGlobal, getPartenairesPage } from "@/lib/strapi";
import type { LocalePageProps } from "@/type";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const [page, global] = await Promise.all([getPartenairesPage(locale), getGlobal(locale)]);
	return buildPageMetadata(page?.seo, global?.seo);
}

export default async function PartenairesPage({ params }: LocalePageProps) {
	const { locale } = await params;
	const page = await getPartenairesPage(locale);

	if (!page) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p className="text-zinc-500">Solutions page not published yet. (locale: {locale})</p>
			</main>
		);
	}

	return (
		<main>
			{page.hero && (
				<PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} subtitle={page.hero.text} />
			)}

			{page.fullWidthImage && <FullWidthImage image={page.fullWidthImage} />}
			{page.partenaireTitle && (
				<Section>
					<SectionHeader
						eyebrow={page.partenaireTitle.eyebrow}
						title={page.partenaireTitle.title}
					/>
				</Section>
			)}
			{page.three_col_cards && <ThreeColCards {...page.three_col_cards} />}
			{page.features && (
				<Section variant="compact">
					<HighlightCard
						title={page.features.title}
						description={page.features.description}
						features={page.features.features}
						image={page.features.image}
						background={page.features.background ?? "primary"}
					/>
				</Section>
			)}
			{page.fullWidthImage2 && <FullWidthImage image={page.fullWidthImage2} />}
			{page.quote_text && page.quote_author && (
				<Section variant="full" className="bg-accent-peach px-5 lg:px-20">
					<Quote text={page.quote_text} author={page.quote_author} role={page.quote_function} />
				</Section>
			)}
		</main>
	);
}
