import type React from "react";
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
      variant="full"
      className={cn(
        "w-full bg-primary px-5 py-10 text-white md:py-16 lg:py-20",
        className,
      )}
    >
      <div className="flex flex-col gap-5 xl:gap-10">
        {eyebrow && (
          <p
            className="hero-animate text-base xl:text-2xl"
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="hero-animate text-3xl md:text-40"
          style={{ "--delay": "150ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="hero-animate text-base leading-tight"
            style={{ "--delay": "300ms" } as React.CSSProperties}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Section>
  );
}
