import type { ComponentPropsWithRef, ElementType } from "react";
import { cn } from "@/lib/utils";

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
        "overflow-hidden rounded-2xl",
        !noPadding && "p-8",
        variants[variant],
        hover &&
          "cursor-pointer transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
