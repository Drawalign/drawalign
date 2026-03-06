import { cn } from "@/lib/utils";

type Props = {
  variant?: "default" | "narrow";
  className?: string;
  children: React.ReactNode;
};

const variants = {
  default: "px-5 py-8 md:py-12 max-w-9xl mx-auto",
  narrow: "px-5 md:px-18 lg:px-38 py-8 md:py-12 max-w-9xl mx-auto",
};

export function Section({ variant = "default", className, children }: Props) {
  return (
    <section className={cn(variants[variant], className)}>{children}</section>
  );
}
