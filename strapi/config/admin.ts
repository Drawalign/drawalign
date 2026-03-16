import type { Core } from "@strapi/strapi";

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
	auth: {
		secret: env("ADMIN_JWT_SECRET"),
	},
	apiToken: {
		salt: env("API_TOKEN_SALT"),
	},
	transfer: {
		token: {
			salt: env("TRANSFER_TOKEN_SALT"),
		},
	},
	secrets: {
		encryptionKey: env("ENCRYPTION_KEY"),
	},
	flags: {
		nps: env.bool("FLAG_NPS", true),
		promoteEE: env.bool("FLAG_PROMOTE_EE", true),
	},
	preview: {
		enabled: true,
		config: {
			allowedOrigins: [env("FRONTEND_URL", "http://localhost:3000")],
			async handler(
				uid: string,
				{ documentId }: { documentId: string; locale?: string; status?: string },
			) {
				const secret = env("PREVIEW_SECRET");
				const frontendUrl = env("FRONTEND_URL", "http://localhost:3000");

				const staticRoutes: Record<string, string> = {
					"api::home.home": "",
					"api::expertise.expertise": "expertises",
					"api::methode-hldb.methode-hldb": "methode-hldb",
					"api::contact.contact": "contact",
					"api::solution.solution": "solutions",
					"api::partenaire.partenaire": "partenaires",
					"api::ressource.ressource": "ressources",
				};

				if (uid in staticRoutes) {
					const slug = staticRoutes[uid];
					return `${frontendUrl}/api/preview?secret=${secret}${slug ? `&slug=${slug}` : ""}`;
				}

				if (uid === "api::page.page") {
					const document = await strapi.documents(uid).findOne({
						documentId,
						fields: ["slug"],
					});

					if (!document?.slug) return null;

					return `${frontendUrl}/api/preview?secret=${secret}&slug=${document.slug}`;
				}

				if (uid === "api::article.article") {
					const document = await strapi.documents(uid).findOne({
						documentId,
						fields: ["slug"],
					});

					if (!document?.slug) return null;

					return `${frontendUrl}/api/preview?secret=${secret}&slug=ressources/${document.slug}`;
				}

				return null;
			},
		},
	},
});

export default config;
