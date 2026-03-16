import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { HowItWorksSplitBlock } from "@/components/solutions/HowItWorksSplitBlock";
import { HowItWorksStepsBlock } from "@/components/solutions/HowItWorksStepsBlock";
import { PricingSection } from "@/components/solutions/PricingSection";
import { ResultSectionBlock } from "@/components/solutions/ResultSectionBlock";
import { SolutionIntroBlock } from "@/components/solutions/SolutionIntroBlock";
import { FullWidthImage } from "@/components/ui/FullWidthImage";
import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { buildPageMetadata } from "@/lib/metadata";
import { getGlobal, getSolutionsPage } from "@/lib/strapi";
import type { LocalePageProps } from "@/type";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const [page, global] = await Promise.all([getSolutionsPage(locale), getGlobal(locale)]);
	return buildPageMetadata(page?.seo, global?.seo);
}

export default async function SolutionsPage({ params }: LocalePageProps) {
	const { locale } = await params;
	const page = await getSolutionsPage(locale);

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

			{page.intro_image && <FullWidthImage image={page.intro_image} />}

			{/* DRAW Scan */}
			{page.draw_scan_intro && (
				<Section className="md:py-5">
					<SolutionIntroBlock {...page.draw_scan_intro} imageRight />
				</Section>
			)}
			{page.draw_scan_how && (
				<HowItWorksSplitBlock {...page.draw_scan_how} cardBackground="accent-peach" />
			)}

			{/* Atelier ALIGN */}
			{page.atelier_align_intro && (
				<Section>
					<SolutionIntroBlock {...page.atelier_align_intro} imageRight background="secondary" />
				</Section>
			)}
			{page.atelier_align_how && <HowItWorksStepsBlock {...page.atelier_align_how} />}
			{page.atelier_align_result && <ResultSectionBlock {...page.atelier_align_result} />}

			{/* Galerie photos */}
			{page.gallery_images && page.gallery_images.length > 0 && (
				<div className="grid grid-cols-1 gap-5 bg-accent-peach px-5 py-5 md:grid-cols-2">
					{page.gallery_images.map((img) => (
						<div key={img.url} className="overflow-hidden rounded-2xl">
							<StrapiImage image={img} className="h-full w-full object-cover" />
						</div>
					))}
				</div>
			)}

			{/* Offres */}
			<PricingSection
				header={page.offers_header}
				offers={page.pricing_offers ?? []}
				combos={page.pricing_combos ?? []}
			/>
		</main>
	);
}
