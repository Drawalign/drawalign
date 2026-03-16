import { Button } from "@/components/ui/button";
import { FeatureList } from "@/components/ui/FeatureList";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { cn } from "@/lib/utils";
import { bgClass } from "@/lib/variants";
import type { SectionHeader as SectionHeaderType, SolutionsPricingCard } from "@/type";

function PricingCard({
	name,
	subtitle,
	logo,
	logo_right,
	description,
	features,
	price,
	cta,
	background,
	buttonVariant = "foreground",
	logoGap = "gap-2",
	priceWhite = false,
}: SolutionsPricingCard & {
	buttonVariant?: "primary" | "foreground";
	logoGap?: string;
	priceWhite?: boolean;
}) {
	return (
		<div
			className={cn(
				"flex flex-col gap-6 rounded-2xl p-8 lg:p-10",
				background === "accent-peach" ? "text-foreground" : "text-white",
				bgClass[background ?? "primary"],
			)}
		>
			<div>
				{logo ? (
					<div
						className={cn("flex flex-wrap", logoGap, logo_right && "flex-row-reverse justify-end")}
					>
						<StrapiImage
							image={logo}
							alt={logo.alternativeText ?? name}
							className="h-8 w-auto self-start object-contain"
						/>
						<p className="self-start font-medium text-40 text-foreground leading-[0.9]">{name}</p>
					</div>
				) : (
					<h3 className="text-2xl tracking-tight">{name}</h3>
				)}
				{subtitle && (
					<p className="font-medium text-foreground text-sm leading-tight lg:text-32">{subtitle}</p>
				)}
			</div>
			{description && (
				<p className="whitespace-pre-line font-medium text-sm leading-tight lg:text-lg">
					{description}
				</p>
			)}
			<div className="flex h-full flex-col justify-between gap-6">
				<div>
					{features && features.length > 0 && (
						<FeatureList items={features} variant="noBorder" className="leading-tight" />
					)}
				</div>
				{price && (
					<p className={cn("text-lg", priceWhite ? "text-white" : "text-primary")}>{price}</p>
				)}
			</div>
			{cta && (
				<div className="mt-auto pt-2">
					<Button href={cta.href} variant={buttonVariant}>
						{cta.label}
					</Button>
				</div>
			)}
		</div>
	);
}

type Props = {
	header: SectionHeaderType | null;
	offers: SolutionsPricingCard[];
	combos: SolutionsPricingCard[];
};

export function PricingSection({ header, offers, combos }: Props) {
	return (
		<Section className="flex flex-col gap-10">
			{header && <SectionHeader title={header.title} eyebrow={header.eyebrow ?? undefined} />}

			{offers.length > 0 && (
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{offers.map((offer) => (
						<PricingCard key={offer.id} {...offer} buttonVariant="primary" logoGap="gap-1" />
					))}
				</div>
			)}

			{combos.length > 0 && (
				<div className="flex flex-col gap-5">
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						{combos.map((combo) => (
							<PricingCard key={combo.id} {...combo} logoGap="gap-4" priceWhite />
						))}
					</div>
				</div>
			)}
		</Section>
	);
}
