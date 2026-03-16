import { FeatureList } from "@/components/ui/FeatureList";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { cn } from "@/lib/utils";
import type { ListItem, StrapiImage as StrapiImageData } from "@/type";

type Props = {
	title?: string | null;
	description?: string | null;
	features?: ListItem[] | null;
	image?: StrapiImageData | null;
	background?: "primary" | "secondary";
	imageRight?: boolean;
	className?: string;
};

const bgVariants = {
	primary: "bg-primary text-white",
	secondary: "bg-secondary text-white",
};

export function HighlightCard({
	title,
	description,
	features,
	image,
	background = "primary",
	imageRight = true,
	className,
}: Props) {
	return (
		<div
			className={cn(
				"grid overflow-hidden rounded-2xl",
				image && "md:grid-cols-2",
				bgVariants[background],
				className,
			)}
		>
			{image && !imageRight && (
				<div className="relative min-h-60">
					<StrapiImage image={image} fill className="object-contain p-4 lg:p-10" />
				</div>
			)}

			<div className="flex flex-col gap-6 p-5 lg:p-16">
				{title && <h2 className="text-3xl tracking-tighter lg:text-4xl">{title}</h2>}
				{description && <p className="whitespace-pre-line text-sm lg:text-base">{description}</p>}
				{features && features.length > 0 && <FeatureList items={features} />}
			</div>

			{image && imageRight && (
				<div className="relative min-h-60">
					<StrapiImage image={image} fill className="object-contain p-5 lg:p-10" />
				</div>
			)}
		</div>
	);
}
