import type { Metadata } from "next";
import { LegalPageView } from "@/components/legal/LegalPageView";
import type { Locale } from "@/lib/i18n-paths";
import { buildPageMetadata } from "@/lib/metadata";
import { getGlobal, getLegalPage } from "@/lib/strapi";
import type { LocalePageProps } from "@/type";

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
	const { locale } = await params;
	const [page, global] = await Promise.all([
		getLegalPage("mentions-legale", locale),
		getGlobal(locale),
	]);
	return buildPageMetadata(page?.seo, global?.seo, {
		route: "/mentions-legales",
		locale: locale as Locale,
	});
}

export default async function MentionsLegalesPage({ params }: LocalePageProps) {
	const { locale } = await params;
	return <LegalPageView page={await getLegalPage("mentions-legale", locale)} />;
}
