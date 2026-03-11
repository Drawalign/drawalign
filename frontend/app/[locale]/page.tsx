import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { HomeConvictions } from "@/components/home/HomeConvictions";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeLogos } from "@/components/home/HomeLogos";
import { HomeQuote } from "@/components/home/HomeQuote";
import { HomeSolutions } from "@/components/home/HomeSolutions";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { FullWidthImage } from "@/components/ui/FullWidthImage";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { ThreeColCards } from "@/components/ui/ThreeColCards";
import { buildPageMetadata } from "@/lib/metadata";
import { getGlobal, getHome } from "@/lib/strapi";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const [home, global] = await Promise.all([getHome(locale), getGlobal(locale)]);

	return buildPageMetadata(home?.seo, global?.seo);
}

export default async function HomePage({ params }: Props) {
	const { locale } = await params;
	const { isEnabled: isDraft } = await draftMode();
	const home = await getHome(locale);

	if (!home) {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<p className="text-zinc-500">Home page not published yet. (locale: {locale})</p>
			</main>
		);
	}

	return (
		<main>
			{isDraft && <PreviewBanner />}
			{home.hero && <HomeHero {...home.hero} />}
			{home.expertises && <ThreeColCards {...home.expertises} />}
			{home.fullWidthImage && <FullWidthImage image={home.fullWidthImage} />}
			{home.quoteSection && <HomeQuote {...home.quoteSection} />}
			{home.convictions && <HomeConvictions {...home.convictions} />}
			{home.solutions && <HomeSolutions {...home.solutions} />}
			{home.testimonials && <HomeTestimonials {...home.testimonials} />}
			{home.logos && <HomeLogos {...home.logos} />}
			{home.teamPhoto && (
				<section className="overflow-hidden bg-primary lg:px-28">
					<StrapiImage image={home.teamPhoto} className="w-full" />
				</section>
			)}
		</main>
	);
}
