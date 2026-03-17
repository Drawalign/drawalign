import { cn } from "@/lib/utils";
import { Section } from "./Section";

type Props = {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  className?: string;
};

export function PageHero({ eyebrow, title, subtitle, className }: Props) {
  return (
    <Section
      variant="md"
      className={cn(
        "w-full bg-primary py-10 text-white md:py-16 lg:py-20",
        className,
      )}
    >
      <div className="flex flex-col gap-5 xl:gap-10">
        {eyebrow && <p className="text-base xl:text-2xl">{eyebrow}</p>}
        <h1 className="text-3xl md:text-40">{title}</h1>
        {subtitle && <p className="text-base leading-tight">{subtitle}</p>}
      </div>
    </Section>
  );
}
