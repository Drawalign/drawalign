import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string | null;
  title: string;
  className?: string;
};

export function SectionHeader({ eyebrow, title, className }: Props) {
  return (
    <div className={cn("text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-base font-medium text-foreground">{eyebrow}</p>
      )}
      <h2 className="text-4xl md:text-6xl tracking-tight">
        {title}
      </h2>
    </div>
  );
}
