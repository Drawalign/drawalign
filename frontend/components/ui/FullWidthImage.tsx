import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import type { StrapiImage } from "@/type";

export function FullWidthImage({
	image,
	maxHeight = "75vh",
	priority = false,
	className,
}: {
	image: StrapiImage;
	maxHeight?: string;
	priority?: boolean;
	className?: string;
}) {
	return (
		<div className={cn("bg-accent-peach p-2 lg:px-5 lg:py-5", className)}>
			<div
				className="relative w-full overflow-hidden rounded-lg lg:rounded-2xl"
				style={{ aspectRatio: `${image.width}/${image.height}`, maxHeight }}
			>
				<Image
					src={getStrapiImageUrl(image.url)}
					alt={image.alternativeText ?? ""}
					fill
					priority={priority}
					className="object-cover object-bottom"
				/>
			</div>
		</div>
	);
}
