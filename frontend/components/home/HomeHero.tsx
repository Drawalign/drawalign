"use client";

import { useEffect, useRef, useState } from "react";
import { RichTextRenderer } from "@/components/blocks/TextBlock";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { HomeHero as HomeHeroType } from "@/type";

type TriangleVariant = "bottom-left" | "right" | "top-left";

function BubbleBadge({ text, triangle }: { text: string; triangle: TriangleVariant }) {
	return (
		<div className="relative w-fit">
			<span className="block whitespace-nowrap rounded-lg bg-secondary px-4 py-3 font-medium text-xs uppercase shadow">
				{text}
			</span>
			{triangle === "bottom-left" && (
				<svg
					className="absolute -bottom-3 left-1/2 fill-secondary"
					width="14"
					height="14"
					viewBox="0 0 14 14"
					aria-hidden="true"
				>
					<polygon points="14,0 0,0 0,14" />
				</svg>
			)}
			{triangle === "right" && (
				<svg
					className="absolute right-1/2 -bottom-3 fill-secondary"
					width="14"
					height="14"
					viewBox="0 0 14 14"
					aria-hidden="true"
				>
					<polygon points="0,0 14,0 14,14" />
				</svg>
			)}
			{triangle === "top-left" && (
				<svg
					className="absolute -top-3 left-1/2 fill-secondary"
					width="14"
					height="14"
					viewBox="0 0 14 14"
					aria-hidden="true"
				>
					<polygon points="0,14 14,14 0,0" />
				</svg>
			)}
		</div>
	);
}

type BubblePosition = { top: string; left: string };

const BUBBLE_POSITIONS: BubblePosition[] = [
	{ top: "15%", left: "48%" }, // bulle 0 : haut droite
	{ top: "53%", left: "5%" }, // bulle 1 : milieu gauche
	{ top: "87%", left: "32%" }, // bulle 2 : bas centre
];

const BUBBLE_POSITIONS_MOBILE: BubblePosition[] = [
	{ top: "15%", left: "28%" }, // bulle 0
	{ top: "50%", left: "2%" }, // bulle 1
	{ top: "85%", left: "8%" }, // bulle 2
];

// Chaque bulle a sa propre amplitude et inertie
const BUBBLE_PARALLAX = [
	{ factor: 1.4, duration: 0.18 },
	{ factor: 0.7, duration: 0.28 },
	{ factor: 1.1, duration: 0.22 },
];

function getTriangleVariant(index: number, total: number): TriangleVariant {
	if (index === 0) return "bottom-left";
	if (index === total - 1) return "top-left";
	return "right";
}

export function HomeHero({ eyebrow, title, text, image, bubbles }: HomeHeroType) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const [leaving, setLeaving] = useState(false);
	const [isMobile, setIsMobile] = useState(() =>
		typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false,
	);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);

	const bubblePositions = isMobile ? BUBBLE_POSITIONS_MOBILE : BUBBLE_POSITIONS;

	useEffect(() => {
		function handleOrientation(e: DeviceOrientationEvent) {
			setLeaving(false);
			setOffset({
				x: Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30)),
				y: Math.max(-1, Math.min(1, (e.beta ?? 0) / 30)),
			});
		}
		window.addEventListener("deviceorientation", handleOrientation);
		return () => window.removeEventListener("deviceorientation", handleOrientation);
	}, []);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;

		function handleMouseMove(e: MouseEvent) {
			const rect = sectionRef.current?.getBoundingClientRect();
			if (!rect) return;
			setLeaving(false);
			setOffset({
				x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
				y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
			});
		}

		function handleMouseLeave() {
			setLeaving(true);
			setOffset({ x: 0, y: 0 });
		}

		el.addEventListener("mousemove", handleMouseMove);
		el.addEventListener("mouseleave", handleMouseLeave);
		return () => {
			el.removeEventListener("mousemove", handleMouseMove);
			el.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<section className="relative w-full overflow-hidden bg-primary text-white">
			<div ref={sectionRef} className="px-6 py-8 md:px-10 md:py-20">
				<div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 xl:grid-cols-[7fr_5fr]">
					{/* Colonne gauche */}
					<div>
						{eyebrow && (
							<p className="mb-4 font-normal text-xl tracking-[-7%] md:text-2xl lg:text-lg xl:text-2xl">
								{eyebrow}
							</p>
						)}
						<h1 className="text-4xl tracking-tight lg:text-3xl xl:text-40">{title}</h1>
						{text && text.length > 0 && (
							<div className="mt-6 text-base xl:text-lg [&_p]:mb-0 [&_p]:leading-5">
								<RichTextRenderer nodes={text} />
							</div>
						)}
					</div>

					{/* Colonne droite */}
					{image && (
						<div className="relative aspect-533/409 md:mx-18 lg:mx-0">
							<StrapiImage image={image} fill className="object-contain" />
							{/* Bulles — flottent au-dessus avec le curseur */}
							{bubbles && bubbles.length > 0 && (
								<div className="absolute inset-0">
									{bubbles.map((bubble, index) => {
										const p = BUBBLE_PARALLAX[index] ?? {
											factor: 1,
											duration: 0.2,
										};
										const tx = -offset.x * 7 * p.factor;
										const ty = -offset.y * 5 * p.factor;
										const t = leaving
											? `transform ${p.duration * 4}s ease-out`
											: `transform ${p.duration}s ease-out`;
										return (
											<div
												key={bubble.id}
												className="absolute"
												style={{
													top: bubblePositions[index]?.top ?? "50%",
													left: bubblePositions[index]?.left ?? "0%",
													transform: `translateY(-50%) translate(${tx}px, ${ty}px)`,
													transition: t,
												}}
											>
												<div
													style={
														isMobile
															? {
																	transform: "scale(0.7)",
																	transformOrigin: "left center",
																}
															: undefined
													}
												>
													<BubbleBadge
														text={bubble.text}
														triangle={getTriangleVariant(index, bubbles.length)}
													/>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
