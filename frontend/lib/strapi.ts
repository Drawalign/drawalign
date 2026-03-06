import qs from "qs";
import type {
  Global,
  Home,
  Page,
  StrapiResponse,
  StrapiSingleResponse,
} from "@/type";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchAPI(
  path: string,
  { draft = false, locale = "fr" }: { draft?: boolean; locale?: string } = {},
) {
  const separator = path.includes("?") ? "&" : "?";
  let fullPath = `${path}${separator}locale=${locale}`;
  if (draft) fullPath += "&status=draft";

  const url = `${STRAPI_URL}/api${fullPath}`;
  const headers: HeadersInit = {};
  if (STRAPI_API_TOKEN) headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  const response = await fetch(
    url,
    draft
      ? { cache: "no-store", headers }
      : { next: { tags: ["strapi-content"] }, headers },
  );
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `[Strapi] ${response.status} ${response.statusText} — ${url}\n${body}`,
    );
  }
  return response.json();
}

export async function getPageBySlug(
  slug: string,
  { draft = false, locale = "fr" }: { draft?: boolean; locale?: string } = {},
): Promise<Page | null> {
  const query = qs.stringify(
    {
      filters: { slug: { $eq: slug } },
      populate: {
        seo: { populate: { ogImage: true } },
        blocks: {
          on: {
            "blocks.hero": { populate: { backgroundImage: true } },
            "blocks.gallery": { populate: { images: true } },
            "blocks.image-block": { populate: { image: true } },
            "blocks.cards": {
              populate: { items: { populate: { image: true } } },
            },
            "blocks.accordion": { populate: { items: true } },
            "blocks.text-block": { populate: "*" },
            "blocks.cta": { populate: "*" },
            "blocks.video-embed": { populate: "*" },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
  const response: StrapiResponse<Page> = await fetchAPI(`/pages?${query}`, {
    draft,
    locale,
  });
  return response.data[0] || null;
}

export async function getAllPages(locale = "fr"): Promise<Page[]> {
  const query = qs.stringify(
    { fields: ["title", "slug"] },
    { encodeValuesOnly: true },
  );
  const response: StrapiResponse<Page> = await fetchAPI(`/pages?${query}`, {
    locale,
  });
  return response.data;
}

export async function getGlobal(locale = "fr"): Promise<Global | null> {
  try {
    const query = qs.stringify(
      {
        populate: {
          seo: { populate: { ogImage: true } },
          navItems: true,
          logo: true,
          footer: {
            populate: {
              logo: true,
              legalLinks: true,
              socialLinks: true,
              logo_esf: true,
            },
          },
          ctaBanner: { populate: { cta: true } },
        },
      },
      { encodeValuesOnly: true },
    );
    const response: StrapiSingleResponse<Global> = await fetchAPI(
      `/global?${query}`,
      { locale },
    );
    return response.data;
  } catch {
    return null;
  }
}

export async function getHome(locale = "fr"): Promise<Home | null> {
  try {
    const query = qs.stringify(
      {
        populate: {
          seo: { populate: { ogImage: true } },
          hero: { populate: { image: true, bubbles: true } },
          expertises: {
            populate: { items: { populate: { icon: true } }, cta: true },
          },
          fullWidthImage: true,
          quoteSection: { populate: { image: true, cta: true } },
          convictions: { populate: { items: true } },
          solutions: {
            populate: {
              button: true,
              items: { populate: { image: true, logo: true, features: true } },
            },
          },
          testimonials: { populate: { items: true } },
          logos: { populate: { logos: true } },
          teamPhoto: true,
        },
      },
      { encodeValuesOnly: true },
    );
    const response: StrapiSingleResponse<Home> = await fetchAPI(
      `/home?${query}`,
      { locale },
    );
    return response.data;
  } catch (err) {
    console.error("[getHome] error:", err);
    return null;
  }
}

export function getStrapiImageUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
