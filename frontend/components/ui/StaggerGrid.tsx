"use client";

import { useEffect, useRef } from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export function StaggerGrid({ children, className }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.dataset.visible = "true";
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
