import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const variants = {
	accent: {
		outer: "bg-accent-peach",
		inner: "bg-accent-peach",
	},
} as const;

type Variant = keyof typeof variants;

type Props = {
	children: ReactNode;
	variant?: Variant;
	className?: string;
	gridClassName?: string;
};

export function SplitCard({ children, variant = "accent", className, gridClassName }: Props) {
	const v = variants[variant];
	return (
		<section className={cn(v.outer, className)}>
			<div className={cn("grid overflow-hidden rounded-2xl md:grid-cols-2", v.inner, gridClassName)}>
				{children}
			</div>
		</section>
	);
}
