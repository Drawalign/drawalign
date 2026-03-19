import { cn } from "@/lib/utils";

type Variant = "default" | "md" | "lg" | "compact" | "full";

type Props = {
	variant?: Variant;
	noPadding?: boolean;
	id?: string;
	className?: string;
	innerClassName?: string;
	children: React.ReactNode;
};

const layout: Record<Exclude<Variant, "full">, string> = {
	default: "px-5 max-w-9xl mx-auto",
	md: "px-5 lg:px-10 max-w-9xl mx-auto",
	lg: "px-8 lg:px-20 max-w-9xl mx-auto",
	compact: "px-5 max-w-9xl mx-auto",
};

const defaultPadding: Record<Variant, string> = {
	default: "py-8 md:py-12",
	md: "py-8 md:py-12",
	lg: "py-8 md:py-12",
	compact: "py-5",
	full: "py-8 md:py-12",
};

export function Section({
	variant = "default",
	noPadding = false,
	id,
	className,
	innerClassName,
	children,
}: Props) {
	if (variant === "full") {
		return (
			<section id={id} className={cn(!noPadding && defaultPadding.full, className)}>
				<div className={cn("mx-auto max-w-9xl px-5", innerClassName)}>{children}</div>
			</section>
		);
	}

	return (
		<section
			id={id}
			className={cn(layout[variant], !noPadding && defaultPadding[variant], className)}
		>
			{children}
		</section>
	);
}
