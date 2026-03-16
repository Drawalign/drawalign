import { RichTextRenderer } from "@/components/blocks/TextBlock";
import { FeatureList } from "@/components/ui/FeatureList";
import { Section } from "@/components/ui/Section";
import { bgClass } from "@/lib/variants";
import type { HowItWorksSplit } from "@/type";

type Props = HowItWorksSplit & {
	cardBackground?: "primary" | "secondary" | "accent-peach";
};

export function HowItWorksSplitBlock({
	title,
	description,
	card_title,
	card_items,
	features,
	cardBackground = "accent-peach",
}: Props) {
	return (
		<Section variant="lg" className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
			{/* Texte gauche */}
			<div className="flex flex-col justify-center gap-8 lg:gap-16">
				{title && <h2 className="text-3xl tracking-tighter lg:text-40">{title}</h2>}
				{description && description.length > 0 && (
					<div className="text-sm leading-tight tracking-[-3.5%] lg:text-lg">
						<RichTextRenderer nodes={description} />
					</div>
				)}
			</div>

			{/* Card droite */}
			<div
				className={`flex flex-col gap-6 rounded-2xl p-8 text-foreground lg:p-10 ${bgClass[cardBackground]}`}
			>
				{card_title && <h3 className="text-xl tracking-tighter lg:text-2xl">{card_title}</h3>}
				{card_items && card_items.length > 0 && (
					<FeatureList items={card_items} className="border-0 px-0" />
				)}
				{features && features.length > 0 && (
					<ul className="flex list-disc flex-col gap-2 pl-5">
						{features.map((f) => (
							<li key={f.id} className="font-bold text-sm lg:text-base">
								{f.text}
							</li>
						))}
					</ul>
				)}
			</div>
		</Section>
	);
}
