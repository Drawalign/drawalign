import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ConvictionsSection } from "@/type";

export function HomeConvictions({ eyebrow, title, items }: ConvictionsSection) {
	return (
		<Section className="md:px-18 lg:px-38">
			<SectionHeader eyebrow={eyebrow} title={title} className="py-10 lg:py-20" />

			<div className="flex flex-col gap-5">
				{items.map((item) => (
					<Card
						key={item.id}
						className="flex flex-col items-center gap-4 p-8 md:gap-6 lg:gap-10 lg:p-15"
					>
						<h3 className="text-center text-base uppercase tracking-[-5%] md:text-2xl lg:text-3xl 2xl:text-4xl">
							{item.title}
						</h3>
						{item.text && (
							<p className="text-center text-foreground text-sm leading-tight lg:text-base lg:leading-normal 2xl:text-xl">
								{item.text}
							</p>
						)}
					</Card>
				))}
			</div>
		</Section>
	);
}
