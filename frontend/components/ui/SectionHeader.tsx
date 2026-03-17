import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string | null;
  title: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, className }: Props) {
  return (
    <div className={cn("px-5 pt-8 text-center lg:px-37", className)}>
      {eyebrow && (
        <p className="mb-7 font-medium text-base text-foreground">{eyebrow}</p>
      )}
      <h2 className="mx-auto max-w-2xl text-4xl tracking-[-7%] md:text-6xl lg:max-w-5xl">
        {title}
      </h2>
    </div>
  );
}
