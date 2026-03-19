import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { StaggerGrid } from "@/components/ui/StaggerGrid";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { cn } from "@/lib/utils";
import type { ExpertisesSection } from "@/type";

type Props = ExpertisesSection & { className?: string };

export function ThreeColCards({ items, cta, className }: Props) {
	return (
		<Section variant="md" className={cn("bg-white", className)}>
			<StaggerGrid className="grid gap-10 md:grid-cols-3">
				{items.map((item, index) => (
					<div
						key={item.id}
						className="stagger-card flex flex-col gap-4 border-l pl-5 lg:gap-8 lg:px-8"
						style={{ animationDelay: `${index * 300}ms` }}
					>
						{item.icon && (
							<StrapiImage image={item.icon} className="h-10 w-auto self-start object-contain" />
						)}
						<div>
							<h3 className="text-2xl lg:text-3xl">{item.title}</h3>
						</div>
						{item.subtitle && (
							<p className="text-base text-foreground leading-tight lg:text-lg">{item.subtitle}</p>
						)}
						{item.text && (
							<p className="text-base text-muted-foreground leading-tight lg:text-lg">
								{item.text}
							</p>
						)}
					</div>
				))}
			</StaggerGrid>

			{cta && (
				<div className="mt-12 flex justify-center">
					<Button href={cta.href}>{cta.label}</Button>
				</div>
			)}
		</Section>
	);
}
