import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import type { HeroBlock as HeroBlockType } from "@/type";

export function HeroBlock({ title, subtitle, backgroundImage, variant }: HeroBlockType) {
	const isCentered = variant === "centered";
	const isFullscreen = variant === "fullscreen";

	return (
		<section
			className={cn(
				"relative flex w-full flex-col justify-center px-8 py-20",
				isCentered && "items-center text-center",
				isFullscreen ? "min-h-screen" : "min-h-100",
			)}
		>
			{backgroundImage && (
				<Image
					src={getStrapiImageUrl(backgroundImage.url)}
					alt={backgroundImage.alternativeText ?? ""}
					fill
					className="object-cover"
					priority
				/>
			)}
			<div className={cn("relative z-10", backgroundImage && "text-white drop-shadow")}>
				<h1 className="font-bold text-4xl tracking-tight sm:text-5xl">{title}</h1>
				{subtitle && <p className="mt-2 text-lg opacity-90">{subtitle}</p>}
			</div>
		</section>
	);
}
