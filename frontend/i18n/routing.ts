import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: ["fr", "en"],
	defaultLocale: "fr",
	localePrefix: "as-needed",
	localeDetection: false,
	pathnames: {
		"/": "/",
		"/solutions": "/solutions",
		"/expertises": "/expertises",
		"/contact": "/contact",
		"/mentions-legales": "/mentions-legales",
		"/politique-de-confidentialite": "/politique-de-confidentialite",
		"/methode-hldb": "/methode-hldb",
		"/partenaires": {
			fr: "/partenaires",
			en: "/partners",
		},
		"/ressources": {
			fr: "/ressources",
			en: "/resources",
		},
		"/ressources/[slug]": {
			fr: "/ressources/[slug]",
			en: "/resources/[slug]",
		},
	},
});
