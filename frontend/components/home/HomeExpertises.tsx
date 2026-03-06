import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { ExpertisesSection } from "@/type";

export function HomeExpertises({ items, cta }: ExpertisesSection) {
  return (
    <Section className="bg-white">
      <div className="grid gap-10 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="flex border-l flex-col gap-8 px-8">
            {item.icon && (
              <StrapiImage
                image={item.icon}
                className="h-10 w-auto object-contain self-start"
              />
            )}
            <div>
              <h3 className="text-3xl">{item.title}</h3>
            </div>
            {item.subtitle && (
              <p className="text-lg text-foreground">{item.subtitle}</p>
            )}
            {item.text && (
              <p className="text-lg text-muted-foreground">{item.text}</p>
            )}
          </div>
        ))}
      </div>

      {cta && (
        <div className="mt-12 flex justify-center">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      )}
    </Section>
  );
}
