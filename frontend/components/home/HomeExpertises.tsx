import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import { Button } from "@/components/ui/button";
import type { ExpertisesSection } from "@/type";

export function HomeExpertises({ items, cta }: ExpertisesSection) {
  return (
    <section className="bg-white py-16 md:py-20 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="flex border-l flex-col gap-8 px-8">
              {item.icon && (
                <Image
                  src={getStrapiImageUrl(item.icon.url)}
                  alt={item.icon.alternativeText ?? ""}
                  width={item.icon.width}
                  height={item.icon.height}
                  className="h-10 w-auto object-contain self-start"
                />
              )}
              <div>
                <h3 className="text-3xl font-normal">{item.title}</h3>
              </div>
              {item.subtitle && (
                <p className="text-lg leading-none text-foreground">
                  {item.subtitle}
                </p>
              )}
              {item.text && (
                <p className="text-lg text-muted-foreground leading-none">
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>

        {cta && (
          <div className="mt-12 flex justify-center">
            <Button href={cta.href}>{cta.label}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
