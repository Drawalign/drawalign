import type { Metadata } from "next";
import { ExpertiseCasesSection } from "@/components/expertises/ExpertiseCasesSection";
import { HomeSolutions } from "@/components/home/HomeSolutions";
import { PageHero } from "@/components/layout/PageHero";
import { FullWidthImage } from "@/components/ui/FullWidthImage";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ThreeColCards } from "@/components/ui/ThreeColCards";
import { buildPageMetadata } from "@/lib/metadata";
import { getExpertisePage, getGlobal } from "@/lib/strapi";
import type { LocalePageProps } from "@/type";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const [page, global] = await Promise.all([getExpertisePage(locale), getGlobal(locale)]);

	return buildPageMetadata(page?.seo, global?.seo);
}

export default async function ExpertisesPage({ params }: LocalePageProps) {
	const { locale } = await params;
	const page = await getExpertisePage(locale);

	if (!page) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p className="text-zinc-500">Expertises page not published yet. (locale: {locale})</p>
			</main>
		);
	}

	return (
		<main>
			{page.hero && (
				<PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} subtitle={page.hero.text} />
			)}
			{page.three_col_cards && (
				<ThreeColCards {...page.three_col_cards} className="py-10 lg:py-20" />
			)}
			{page.fullWidthImage && <FullWidthImage image={page.fullWidthImage} />}
			{page.cards_group && page.cards_group.length > 0 && (
				<HomeSolutions items={page.cards_group} />
			)}
			{page.client_cases && page.client_cases.length > 0 ? (
				<ExpertiseCasesSection cases={page.client_cases}>
					{page.fullWidthImage2 && <FullWidthImage image={page.fullWidthImage2} />}
					{page.client_case_header && (
						<Section>
							<SectionHeader
								eyebrow={page.client_case_header.eyebrow}
								title={page.client_case_header.title}
							/>
						</Section>
					)}
				</ExpertiseCasesSection>
			) : (
				<>
					{page.fullWidthImage2 && <FullWidthImage image={page.fullWidthImage2} />}
					{page.client_case_header && (
						<Section>
							<SectionHeader
								eyebrow={page.client_case_header.eyebrow}
								title={page.client_case_header.title}
							/>
						</Section>
					)}
				</>
			)}
		</main>
	);
}
