import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const strapiUrl = new URL(process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337");
const strapiMediaUrl = process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL
	? new URL(process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL)
	: null;

const nextConfig: NextConfig = {
	async headers() {
		const strapiOrigin = strapiUrl.origin;
		return [
			{
				source: "/(.*)",
				headers: [
					// Allow Strapi admin to embed pages in its preview iframe
					{ key: "Content-Security-Policy", value: `frame-ancestors 'self' ${strapiOrigin}` },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
				],
			},
		];
	},
	images: {
		minimumCacheTTL: 2678400, // 31 jours
		formats: ["image/webp"],
		qualities: [75],
		remotePatterns: [
			{
				protocol: strapiUrl.protocol.replace(":", "") as "http" | "https",
				hostname: strapiUrl.hostname,
				port: strapiUrl.port,
				pathname: "/uploads/**",
			},
			...(strapiMediaUrl
				? [
						{
							protocol: strapiMediaUrl.protocol.replace(":", "") as "http" | "https",
							hostname: strapiMediaUrl.hostname,
							pathname: "/**",
						},
					]
				: []),
		],
		dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
	},
};

export default withNextIntl(nextConfig);
