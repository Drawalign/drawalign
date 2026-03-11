import { Button } from "@/components/ui/button";
import { FeatureList } from "@/components/ui/FeatureList";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { bgClass } from "@/lib/variants";
import type { SectionHeader as SectionHeaderType, SolutionsPricingCard } from "@/type";

function PricingCard({ name, description, features, cta, background }: SolutionsPricingCard) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-2xl p-8 text-white lg:p-10",
        bgClass[background ?? "primary"],
      )}
    >
      <h3 className="text-2xl tracking-tight">{name}</h3>
      {description && (
        <p className="text-sm opacity-90 lg:text-base">{description}</p>
      )}
      {features && features.length > 0 && <FeatureList items={features} />}
      {cta && (
        <div className="mt-auto pt-2">
          <Button href={cta.href} variant="white">
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}

type Props = {
  header: SectionHeaderType | null;
  offers: SolutionsPricingCard[];
  combos: SolutionsPricingCard[];
};

export function PricingSection({ header, offers, combos }: Props) {
  return (
    <Section className="flex flex-col gap-12">
      {header && (
        <SectionHeader title={header.title} eyebrow={header.eyebrow ?? undefined} />
      )}

      {offers.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {offers.map((offer) => (
            <PricingCard key={offer.id} {...offer} />
          ))}
        </div>
      )}

      {combos.length > 0 && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {combos.map((combo) => (
              <PricingCard key={combo.id} {...combo} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
