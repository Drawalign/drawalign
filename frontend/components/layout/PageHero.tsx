import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  className?: string;
};

export function PageHero({ eyebrow, title, subtitle, className }: Props) {
  return (
    <section className={cn("w-full bg-primary text-white", className)}>
      <div className="px-5 py-10 md:py-16 max-w-9xl mx-auto">
        {eyebrow && (
          <p className="mb-4 text-sm text-white/60">{eyebrow}</p>
        )}
        <h1 className="text-4xl md:text-5xl tracking-tight max-w-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
