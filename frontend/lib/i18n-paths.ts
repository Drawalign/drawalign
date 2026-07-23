import { routing } from "@/i18n/routing";

export type PathnameKey = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function localePrefix(locale: Locale): string {
	return locale === routing.defaultLocale ? "" : `/${locale}`;
}

export function resolveLocalizedPathname(route: PathnameKey, locale: Locale): string {
	const entry = routing.pathnames[route];
	const localized = typeof entry === "string" ? entry : (entry[locale] ?? route);
	const prefix = localePrefix(locale);
	// Avoid a doubled "/" when the prefixed locale ("/en") meets the root pathname ("/").
	return localized === "/" ? prefix || "/" : `${prefix}${localized}`;
}

export function absoluteSiteUrl(pathname: string): string {
	return `${SITE_URL}${pathname}`;
}
