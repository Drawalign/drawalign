import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { ImageBlock as ImageBlockType } from "@/type";

export function ImageBlock({ image, caption, full_width }: ImageBlockType) {
	if (!image) return null;

	const isFullWidth = full_width !== false;

	return (
		<figure className="mx-auto w-full max-w-5xl px-8 py-8">
			<div className={isFullWidth ? "relative overflow-hidden rounded-xl" : "flex justify-center"}>
				<Image
					src={getStrapiImageUrl(image.url)}
					alt={image.alternativeText ?? caption ?? ""}
					width={image.width}
					height={image.height}
					className={isFullWidth ? "h-auto w-full object-cover" : "rounded-xl"}
					style={isFullWidth ? undefined : { maxWidth: "100%" }}
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
