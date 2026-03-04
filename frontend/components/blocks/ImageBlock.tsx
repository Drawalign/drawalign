import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { ImageBlock as ImageBlockType } from "@/type";

export function ImageBlock({ image, caption }: ImageBlockType) {
	if (!image) return null;

	return (
		<figure className="mx-auto w-full max-w-3xl px-8 py-8">
			<div className="relative overflow-hidden rounded-xl">
				<Image
					src={getStrapiImageUrl(image.url)}
					alt={image.alternativeText ?? caption ?? ""}
					width={image.width}
					height={image.height}
					className="h-auto w-full object-cover"
				/>
			</div>
			{caption && (
				<figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
