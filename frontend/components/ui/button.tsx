import Link from "next/link";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/utils";

type BaseProps = {
	children: React.ReactNode;
	className?: string;
	variant?: "primary" | "secondary" | "white" | "foreground";
	size?: "sm" | "md";
	arrow?: boolean;
};

type ButtonAsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsLink = BaseProps & { href: string; target?: string };

type Props = ButtonAsButton | ButtonAsLink;

const variants = {
	primary: "btn-primary text-white",
	secondary: "bg-secondary text-white transition-colors",
	white: "bg-white text-primary hover:bg-white transition-colors",
	foreground: "btn-foreground text-background",
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
	arrow,
	...props
}: Props) {
	const base = cn(
		"inline-flex cursor-pointer items-center justify-center rounded-full font-medium",
		variants[variant],
		sizes[size],
		className,
	);

	const inner = arrow ? (
		<span className="relative z-10 flex items-center gap-2">
			{children}
			<ArrowIcon />
		</span>
	) : (
		<span className="relative z-10">{children}</span>
	);

	if ("href" in props && props.href) {
		const { href, target, ...rest } = props as ButtonAsLink;
		return (
			<Link href={href} target={target} className={base} {...rest}>
				{inner}
			</Link>
		);
	}

	const { ...rest } = props as ButtonAsButton;
	return (
		<button type="button" className={base} {...rest}>
			{inner}
		</button>
	);
}
