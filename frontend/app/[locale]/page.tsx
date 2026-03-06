import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { PreviewBanner } from "@/components/layout/PreviewBanner";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeExpertises } from "@/components/home/HomeExpertises";
import { HomeFullWidthImage } from "@/components/home/HomeFullWidthImage";
import { HomeQuote } from "@/components/home/HomeQuote";
import { HomeConvictions } from "@/components/home/HomeConvictions";
import { HomeSolutions } from "@/components/home/HomeSolutions";
import { HomeTestimonials } from "@/components/home/HomeTestimonials";
import { HomeLogos } from "@/components/home/HomeLogos";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { getGlobal, getHome, getStrapiImageUrl } from "@/lib/strapi";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const [home, global] = await Promise.all([
    getHome(locale),
    getGlobal(locale),
  ]);

  const title = home?.seo?.metaTitle || undefined;
  const description =
    home?.seo?.metaDescription || global?.seo?.metaDescription;
  const ogImage = home?.seo?.ogImage || global?.seo?.ogImage;

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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const { isEnabled: isDraft } = await draftMode();
  const home = await getHome(locale);

  if (!home) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-500">
          Home page not published yet. (locale: {locale})
        </p>
      </main>
    );
  }

  return (
    <main>
      {isDraft && <PreviewBanner />}
      {home.hero && <HomeHero {...home.hero} />}
      {home.expertises && <HomeExpertises {...home.expertises} />}
      {home.fullWidthImage && (
        <HomeFullWidthImage image={home.fullWidthImage} />
      )}
      {home.quoteSection && <HomeQuote {...home.quoteSection} />}
      {home.convictions && <HomeConvictions {...home.convictions} />}
      {home.solutions && <HomeSolutions {...home.solutions} />}
      {home.testimonials && <HomeTestimonials {...home.testimonials} />}
      {home.logos && <HomeLogos {...home.logos} />}
      {home.teamPhoto && (
        <section className="bg-primary overflow-hidden">
          <StrapiImage image={home.teamPhoto} className="w-full" />
        </section>
      )}
    </main>
  );
}
