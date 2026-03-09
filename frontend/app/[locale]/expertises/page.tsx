import type { Metadata } from "next";
import { getGlobal, getExpertisePage, getStrapiImageUrl } from "@/lib/strapi";
import { PageHero } from "@/components/layout/PageHero";
import { ExpertisesItems } from "@/components/expertises/ExpertisesItems";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [page, global] = await Promise.all([
    getExpertisePage(locale),
    getGlobal(locale),
  ]);

  const title = page?.seo?.metaTitle || undefined;
  const description = page?.seo?.metaDescription || global?.seo?.metaDescription;
  const ogImage = page?.seo?.ogImage || global?.seo?.ogImage;

  return {
    title: title ?? undefined,
    description: description ?? undefined,
    openGraph: {
      title: title ?? undefined,
      description: description ?? undefined,
      images: ogImage
        ? [
            {
              url: getStrapiImageUrl(ogImage.url),
              width: ogImage.width,
              height: ogImage.height,
              alt: ogImage.alternativeText ?? title ?? "",
            },
          ]
        : [],
    },
  };
}

export default async function ExpertisesPage({ params }: Props) {
  const { locale } = await params;
  const page = await getExpertisePage(locale);

  if (!page) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">
          Expertises page not published yet. (locale: {locale})
        </p>
      </main>
    );
  }

  return (
    <main>
      {page.hero && (
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          subtitle={page.hero.text}
        />
      )}
      {page.cards_group && page.cards_group.length > 0 && (
        <ExpertisesItems items={page.cards_group} />
      )}
    </main>
  );
}
