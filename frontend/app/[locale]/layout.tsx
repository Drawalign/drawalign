import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getGlobal, getStrapiImageUrl } from "@/lib/strapi";

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	const global = await getGlobal(locale);
	const siteName = global?.siteName || "My Site";
	const ogImage = global?.seo?.ogImage;

	return {
		title: {
			template: `%s | ${siteName}`,
			default: siteName,
		},
		description: global?.seo?.metaDescription || "Built with Strapi and Next.js",
		openGraph: {
			siteName,
			images: ogImage ? [getStrapiImageUrl(ogImage.url)] : [],
		},
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as "fr" | "en")) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<SiteLayout locale={locale}>{children}</SiteLayout>
		</NextIntlClientProvider>
	);
}
