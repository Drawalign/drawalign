import { cn } from "@/lib/utils";
import type { ElementType, ComponentPropsWithRef } from "react";

const variants = {
  light: "bg-accent-peach text-foreground",
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  dark: "bg-foreground text-white",
  outlined: "border-2 border-border bg-transparent text-foreground",
} as const;

type Props<T extends ElementType = "div"> = {
  as?: T;
  variant?: keyof typeof variants;
  hover?: boolean;
  noPadding?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithRef<T>, "as" | "variant" | "hover" | "noPadding">;

export function Card<T extends ElementType = "div">({
  as,
  variant = "light",
  hover = false,
  noPadding = false,
  className,
  children,
  ...props
}: Props<T>) {
  const Tag = as ?? "div";

  return (
    <Tag
      className={cn(
        "rounded-2xl overflow-hidden",
        !noPadding && "p-8",
        variants[variant],
        hover && "transition-shadow hover:shadow-lg cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
