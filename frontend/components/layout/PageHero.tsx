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
      <div className="px-10 flex flex-col gap-10 py-20 md:py-16 max-w-9xl mx-auto">
        {eyebrow && <p className="text-2xl">{eyebrow}</p>}
        <h1 className="text-4xl md:text-[40px]">{title}</h1>
        {subtitle && <p className="text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
