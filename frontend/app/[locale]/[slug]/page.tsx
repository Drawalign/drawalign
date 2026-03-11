import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { buildPageMetadata } from "@/lib/metadata";
import { getGlobal, getPageBySlug } from "@/lib/strapi";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  // Generate for all locales — locale layout already handles per-locale
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const [page, global] = await Promise.all([
    getPageBySlug(slug, { locale }),
    getGlobal(locale),
  ]);
  if (!page) return {};

  const pageSeo = page.seo ?? { metaTitle: page.title, metaDescription: null, ogImage: null };
  return buildPageMetadata(pageSeo, global?.seo);
}

export default async function PageBySlug({ params }: Props) {
  const { locale, slug } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const page = await getPageBySlug(slug, { draft: isDraft, locale });

  if (!page) notFound();

  return (
    <main>
      {isDraft && <PreviewBanner />}
      <BlockRenderer blocks={page.blocks ?? []} />
    </main>
  );
}
