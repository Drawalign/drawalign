import { StrapiImage } from "@/components/ui/StrapiImage";
import { cn } from "@/lib/utils";
import type { SolutionIntro } from "@/type";

type Props = SolutionIntro & {
	imageRight?: boolean;
};

export function SolutionIntroBlock({
	name,
	logo,
	image,
	title,
	illustration,
	description,
	background,
	imageRight = true,
}: Props) {
	return (
		<div
			className={cn("flex flex-col justify-center gap-5 overflow-hidden rounded-2xl lg:flex-row")}
		>
			{/* Image — en premier dans le DOM, réordonné par CSS */}
			{image && (
				<div className={cn("", imageRight ? "order-last" : "")}>
					<div className="relative min-h-60 overflow-hidden rounded-2xl md:h-full lg:w-98">
						<StrapiImage image={image} fill className="aspect-square object-cover" />
					</div>
				</div>
			)}

			{/* Contenu */}
			<div
				className={cn(
					`flex flex-col gap-10 rounded-2xl lg:flex-row bg-${background} py-10 text-white lg:p-20`,
					imageRight ? "pr-10 pl-5 lg:pr-20" : "pr-5 pl-10 lg:pl-20",
				)}
			>
				<div className="flex flex-col gap-6">
					{logo ? (
						<div className={cn("flex gap-2", !imageRight && "flex-row-reverse justify-end")}>
							<StrapiImage
								image={logo}
								alt={logo.alternativeText ?? name}
								className="h-8 w-auto self-start object-contain"
							/>
							<p className="self-start font-medium text-40 text-foreground leading-[0.9]">{name}</p>
						</div>
					) : (
						<p className="font-medium text-40 text-foreground leading-[0.9]">{name}</p>
					)}
					{title && <h3 className="max-w-[300px]text-3xl tracking-tighter lg:text-4xl">{title}</h3>}
					{description && (
						<p className="max-w-125 text-sm tracking-[-4.5%] lg:text-base">{description}</p>
					)}
				</div>
				{illustration && (
					<StrapiImage
						image={illustration}
						alt={`${name} illustration`}
						className="mx-auto h-auto w-52"
					/>
				)}
			</div>
		</div>
	);
}
