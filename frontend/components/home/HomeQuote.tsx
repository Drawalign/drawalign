import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import { Button } from "@/components/ui/button";
import type { QuoteSection } from "@/type";

export function HomeQuote({ image, title, text, cta }: QuoteSection) {
  return (
    <section className="bg-secondary-light px-5 pb-5">
      <div className="grid rounded-2xl bg-secondary-light md:grid-cols-2 overflow-hidden">
        {/* Gauche : titre + texte + CTA */}
        <div className="flex flex-col bg-primary justify-between gap-12 px-10 3xl:px-18 py-16 md:py-24">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl md:text-4xl 3xl:text-6xl font-normal leading-none text-white">
              {title}
            </h2>
            {text && (
              <p className="text-base 3xl:text-2xl text-white leading-none">
                {text}
              </p>
            )}
          </div>
          {cta && (
            <div>
              <Button href={cta.href} variant="foreground" size="sm">
                {cta.label}
              </Button>
            </div>
          )}
        </div>
        {/* Droite : image */}
        {image && (
          <div className="relative bg-secondary min-h-72 md:min-h-0">
            <Image
              src={getStrapiImageUrl(image.url)}
              alt={image.alternativeText ?? ""}
              fill
              className=""
            />
          </div>
        )}
      </div>
    </section>
  );
}
