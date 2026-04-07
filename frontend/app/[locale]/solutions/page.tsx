import type { Metadata } from "next";
import { HowItWorksSplit } from "@/components/solutions/HowItWorksSplit";
import { HowItWorksSteps } from "@/components/solutions/HowItWorksSteps";
import { PricingSection } from "@/components/solutions/PricingSection";
import { ResultSection } from "@/components/solutions/ResultSection";
import { SolutionIntro } from "@/components/solutions/SolutionIntro";
import { FullWidthImage } from "@/components/ui/FullWidthImage";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { buildPageMetadata } from "@/lib/metadata";
import { getGlobal, getSolutionsPage } from "@/lib/strapi";
import type { LocalePageProps } from "@/type";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const [page, global] = await Promise.all([
    getSolutionsPage(locale),
    getGlobal(locale),
  ]);
  return buildPageMetadata(page?.seo, global?.seo);
}

export default async function SolutionsPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const page = await getSolutionsPage(locale);

  if (!page) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">
          Solutions page not published yet. (locale: {locale})
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

      {page.intro_image && <FullWidthImage image={page.intro_image} />}

      {/* DRAW Scan */}
      {page.draw_scan_intro && (
        <Section className="md:py-5">
          <SolutionIntro {...page.draw_scan_intro} imageRight />
        </Section>
      )}
      {page.draw_scan_how && (
        <HowItWorksSplit
          {...page.draw_scan_how}
          cardBackground="accent-peach"
        />
      )}

      {/* Atelier ALIGN */}
      {page.atelier_align_intro && (
        <Section>
          <SolutionIntro
            {...page.atelier_align_intro}
            imageRight
            background="secondary"
          />
        </Section>
      )}
      {page.atelier_align_how && (
        <HowItWorksSteps {...page.atelier_align_how} />
      )}
      {page.atelier_align_result && (
        <ResultSection {...page.atelier_align_result} />
      )}

      {/* Galerie photos */}
      {page.gallery_images && page.gallery_images.length > 0 && (
        <div className="grid grid-cols-1 gap-5 bg-accent-peach px-5 py-5 md:grid-cols-2">
          {page.gallery_images.map((img) => (
            <div
              key={img.url}
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "610/460" }}
            >
              <StrapiImage image={img} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Offres */}
      <PricingSection
        header={page.offers_header}
        offers={page.pricing_offers ?? []}
        combos={page.pricing_combos ?? []}
      />
    </main>
  );
}
