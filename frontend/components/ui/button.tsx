import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "white" | "foreground";
  size?: "sm" | "md";
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps & { href: string; target?: string };

type Props = ButtonAsButton | ButtonAsLink;

const variants = {
  primary: "btn-primary text-white",
  white: "bg-white text-primary hover:bg-white transition-colors",
  foreground:
    "bg-foreground text-background hover:bg-secondary transition-colors",
};

const sizes = {
  sm: "px-6 py-2 text-xs 2xl:text-lg",
  md: "px-8 py-3 text-sm 2xl:text-xl",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  const base = cn(
    "inline-flex items-center justify-center rounded-full font-medium cursor-pointer",
    variants[variant],
    sizes[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, target, ...rest } = props as ButtonAsLink;
    return (
      <Link href={href} target={target} className={base} {...rest}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button type="button" className={base} {...rest}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
