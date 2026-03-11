import qs from "qs";
import type {
  ExpertisePage,
  Global,
  Home,
  MethodeHldbPage,
  Page,
  SolutionsPage,
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

export async function getExpertisePage(
  locale = "fr",
): Promise<ExpertisePage | null> {
  try {
    const query = qs.stringify(
      {
        populate: {
          seo: { populate: { ogImage: true } },
          hero: true,
          three_col_cards: {
            populate: { items: { populate: { icon: true } }, cta: true },
          },
          fullWidthImage: true,
          cards_group: { populate: { image: true, features: true } },
          client_cases: {
            populate: {
              features: true,
              objectives: true,
              tags: true,
              context_items: true,
              solution_steps: { populate: { items: true } },
              results_metrics: true,
            },
          },
          fullWidthImage2: true,
          client_case_header: true,
        },
      },
      { encodeValuesOnly: true },
    );
    const response: StrapiSingleResponse<ExpertisePage> = await fetchAPI(
      `/expertise?${query}`,
      {
        locale,
      },
    );
    return response.data;
  } catch (err) {
    console.error("[getExpertisePage] error:", err);
    return null;
  }
}

export async function getMethodeHldbPage(
  locale = "fr",
): Promise<MethodeHldbPage | null> {
  try {
    const query = qs.stringify(
      {
        populate: {
          seo: { populate: { ogImage: true } },
          hero: true,
          hero_diagram: true,
          diagram_left: true,
          diagram_right: true,
          principles_items: true,
          theoretical_items: true,
          section3_cta: true,
          fullWidthImage: true,
          maturity_cta: true,
          maturity_image: true,
        },
      },
      { encodeValuesOnly: true },
    );
    const response: StrapiSingleResponse<MethodeHldbPage> = await fetchAPI(
      `/methode-hldb?${query}`,
      { locale },
    );
    return response.data;
  } catch (err) {
    console.error("[getMethodeHldbPage] error:", err);
    return null;
  }
}

export async function getSolutionsPage(
  locale = "fr",
): Promise<SolutionsPage | null> {
  try {
    const query = qs.stringify(
      {
        populate: {
          seo: { populate: { ogImage: true } },
          hero: true,
          intro_image: true,
          draw_scan_intro: {
            populate: { logo: true, image: true, illustration: true },
          },
          draw_scan_how: { populate: { card_items: true } },
          atelier_align_intro: {
            populate: { logo: true, image: true, illustration: true },
          },
          atelier_align_how: {
            populate: { steps: { populate: { items: true } } },
          },
          atelier_align_result: { populate: { items: true } },
          gallery_images: true,
          offers_header: true,
          pricing_offers: { populate: { features: true, cta: true } },
          pricing_combos: { populate: { features: true, cta: true } },
        },
      },
      { encodeValuesOnly: true },
    );
    const response: StrapiSingleResponse<SolutionsPage> = await fetchAPI(
      `/solution?${query}`,
      { locale },
    );
    return response.data;
  } catch (err) {
    console.error("[getSolutionsPage] error:", err);
    return null;
  }
}

export function getStrapiImageUrl(url: string): string {
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
