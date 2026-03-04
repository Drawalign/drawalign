import type { Block } from "@/type";
import { AccordionBlock } from "./blocks/AccordionBlock";
import { CardsBlock } from "./blocks/CardsBlock";
import { CTABlock } from "./blocks/CTABlock";
import { HeroBlock } from "./blocks/HeroBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { TextBlock } from "./blocks/TextBlock";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return (
		<>
			{blocks.map((block) => {
				switch (block.__component) {
					case "blocks.hero":
						return <HeroBlock key={`${block.__component}-${block.id}`} {...block} />;
					case "blocks.text-block":
						return <TextBlock key={`${block.__component}-${block.id}`} {...block} />;
					case "blocks.cta":
						return <CTABlock key={`${block.__component}-${block.id}`} {...block} />;
					case "blocks.image-block":
						return <ImageBlock key={`${block.__component}-${block.id}`} {...block} />;
					case "blocks.accordion":
						return <AccordionBlock key={`${block.__component}-${block.id}`} {...block} />;
					case "blocks.cards":
						return <CardsBlock key={`${block.__component}-${block.id}`} {...block} />;
					default:
						return null;
				}
			})}
		</>
	);
}
