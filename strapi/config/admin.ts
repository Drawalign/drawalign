import type { Core } from "@strapi/strapi";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
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
      async handler(uid: string, { documentId }: { documentId: string; locale?: string; status?: string }) {
        if (uid !== "api::page.page") return null;

        const document = await strapi.documents(uid).findOne({
          documentId,
          fields: ["slug"],
        });

        if (!document?.slug) return null;

        const secret = env("PREVIEW_SECRET");
        const frontendUrl = env("FRONTEND_URL", "http://localhost:3000");

        return `${frontendUrl}/api/preview?secret=${secret}&slug=${document.slug}`;
      },
    },
  },
});

export default config;
