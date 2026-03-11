import { Button } from "@/components/ui/button";
import { SplitCard } from "@/components/ui/SplitCard";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { QuoteSection } from "@/type";

export function HomeQuote({ image, title, text, cta }: QuoteSection) {
	return (
		<SplitCard className="px-5 pb-5">
				{/* Gauche : titre + texte + CTA */}
				<div className="flex flex-col justify-between gap-8 bg-primary 3xl:px-18 px-10 py-16 md:py-24">
					<div className="flex flex-col gap-6">
						<h2 className="3xl:text-6xl text-3xl text-white md:text-4xl">{title}</h2>
						{text && <p className="3xl:text-2xl text-base text-white">{text}</p>}
					</div>
					{cta && (
						<div>
							<Button href={cta.href} variant="foreground" size="sm">
								{cta.label}
							</Button>
						</div>
					)}
				</div>
				{/* Droite : image */}
				{image && (
					<div className="relative min-h-72 bg-secondary md:min-h-0">
						<StrapiImage image={image} fill className="" />
					</div>
				)}
		</SplitCard>
	);
}
