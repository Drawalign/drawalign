"use client";

import { cn } from "@/lib/utils";

type Props = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

export function BentoCard({ children, className, style }: Props) {
	return (
		<div
			className={cn("stagger-card-bento", className)}
			style={style}
			onAnimationEnd={(e) =>
				e.currentTarget.classList.replace("stagger-card-bento", "bento-card-ready")
			}
		>
			{children}
		</div>
	);
}
