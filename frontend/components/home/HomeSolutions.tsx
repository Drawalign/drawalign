import { Button } from "@/components/ui/button";
import { FeatureList } from "@/components/ui/FeatureList";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { cn } from "@/lib/utils";
import { bgClass } from "@/lib/variants";
import type { CtaLink, HomeSolutionItem } from "@/type";

type Props = {
	eyebrow?: string | null;
	title?: string | null;
	button?: CtaLink | null;
	items: HomeSolutionItem[];
};

export function HomeSolutions({ eyebrow, title, button, items }: Props) {
	return (
		<Section>
			{title && <SectionHeader eyebrow={eyebrow} title={title} className="lg:pt-0 lg:pb-20" />}

			<div className="flex flex-col gap-5 md:px-5">
				{items.map((item, index) => {
					const isEven = index % 2 === 0;
					return (
						<div
							key={item.id}
							className={cn(
								"grid overflow-hidden rounded-2xl md:grid-cols-2",
								bgClass[item.background ?? "primary"],
								isEven ? "md:mr-[15%]" : "md:ml-[15%]",
							)}
						>
							{/* Image */}
							{item.image && (
								<div
									className={cn(
										"py-5 lg:py-10",
										isEven ? "lg:pl-20" : "lg:pr-20",
										!isEven && "md:order-last",
									)}
								>
									<div className="relative min-h-60 md:h-full">
										<StrapiImage image={item.image} fill className="object-contain" />
									</div>
								</div>
							)}
							{/* Contenu */}
							<div
								className={cn(
									"flex flex-col gap-10 py-5 lg:py-16",
									isEven
										? "pr-0 pl-0 md:pr-0 md:pl-5 xl:pr-20 xl:pl-10"
										: "pr-0 pl-0 md:pr-5 md:pl-5 xl:pr-10 xl:pl-20",
									"text-white",
								)}
							>
								<div className="flex flex-col gap-6">
									{item.logo && (
										<div className="flex gap-2">
											<StrapiImage
												image={item.logo}
												alt={item.logo.alternativeText ?? item.name ?? ""}
												className={cn(
													"h-8 w-auto self-start object-contain",
													!isEven && "order-last",
												)}
											/>
											<p className="self-start font-medium text-40 text-foreground leading-[0.9]">
												{item.name}
											</p>
										</div>
									)}
									{item.title && (
										<h3 className="max-w-3xs text-3xl tracking-tighter lg:text-4xl">
											{item.title}
										</h3>
									)}
									{item.description && (
										<p className="text-sm tracking-[-4.5%] lg:text-base">{item.description}</p>
									)}
									{item.features && item.features.length > 0 && (
										<FeatureList items={item.features} />
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{button && (
				<div className="mt-10 flex justify-center">
					<Button href={button.href}>{button.label}</Button>
				</div>
			)}
		</Section>
	);
}
