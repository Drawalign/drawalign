import type { Metadata } from "next";
import { MethodeMaturity } from "@/components/methode/MethodeMaturity";
import { MethodePrincipes } from "@/components/methode/MethodePrincipes";
import { FullWidthImage } from "@/components/ui/FullWidthImage";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { buildPageMetadata } from "@/lib/metadata";
import { getGlobal, getMethodeHldbPage } from "@/lib/strapi";
import type { LocalePageProps } from "@/type";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const [page, global] = await Promise.all([getMethodeHldbPage(locale), getGlobal(locale)]);

	return buildPageMetadata(page?.seo, global?.seo);
}

export default async function MethodeHldbPage({ params }: LocalePageProps) {
	const { locale } = await params;
	const page = await getMethodeHldbPage(locale);

	if (!page) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p className="text-zinc-500">Méthode HLDB page not published yet. (locale: {locale})</p>
			</main>
		);
	}

	return (
		<main>
			{page.hero && (
				<PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} subtitle={page.hero.text} />
			)}
			{page.hero_diagram && (
				<Section className="flex justify-center">
					<StrapiImage image={page.hero_diagram} className="w-full max-w-sm md:max-w-md" />
				</Section>
			)}
			<MethodePrincipes
				center_title={page.diagram_center_title}
				center_text={page.diagram_center_text}
				left={page.diagram_left}
				right={page.diagram_right}
				principles_title={page.principles_title}
				principles_items={page.principles_items}
				theoretical_title={page.theoretical_title}
				theoretical_items={page.theoretical_items}
				section3_cta={page.section3_cta}
			/>
			{page.fullWidthImage && <FullWidthImage image={page.fullWidthImage} />}
			{(page.maturity_title ||
				page.maturity_text ||
				page.highlight_text ||
				page.maturity_image) && (
				<MethodeMaturity
					maturity_title={page.maturity_title}
					maturity_text={page.maturity_text}
					highlight_title={page.highlight_title}
					highlight_text={page.highlight_text}
					maturity_cta={page.maturity_cta}
					maturity_image={page.maturity_image}
				/>
			)}
		</main>
	);
}
