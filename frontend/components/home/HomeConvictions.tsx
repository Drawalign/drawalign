import type { ConvictionsSection } from "@/type";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HomeConvictions({ eyebrow, title, items }: ConvictionsSection) {
  return (
    <Section variant="narrow">
        <SectionHeader eyebrow={eyebrow} title={title} className="mb-12" />

        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <Card
              key={item.id}
              className="flex items-center flex-col gap-4 md:gap-6 lg:gap-10 p-8 lg:p-15"
            >
              <h3 className="text-base md:text-2xl lg:text-3xl 2xl:text-4xl text-center tracking-[-5%] uppercase">
                {item.title}
              </h3>
              {item.text && (
                <p className="text-sm lg:text-base 2xl:text-xl text-foreground text-center">
                  {item.text}
                </p>
              )}
            </Card>
          ))}
        </div>
    </Section>
  );
}
