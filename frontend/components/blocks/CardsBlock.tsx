import Image from "next/image";
import Link from "next/link";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { CardsBlock as CardsBlockType } from "@/type";

export function CardsBlock({ items }: CardsBlockType) {
	if (!items?.length) return null;
	return (
		<section className="w-full px-8 py-16">
			<div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((item) => (
					<div
						key={item.id}
						className="flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm"
					>
						{item.image && (
							<div className="relative aspect-video w-full overflow-hidden">
								<Image
									src={getStrapiImageUrl(item.image.url)}
									alt={item.image.alternativeText ?? item.title}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<div className="flex flex-1 flex-col gap-2 p-5">
							<h3 className="font-heading font-semibold text-lg">{item.title}</h3>
							{item.description && (
								<p className="flex-1 text-muted-foreground text-sm">{item.description}</p>
							)}
							{item.linkHref && item.linkLabel && (
								<Link
									href={item.linkHref}
									className="mt-2 self-start font-medium text-sm underline-offset-4 hover:underline"
								>
									{item.linkLabel} →
								</Link>
							)}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
