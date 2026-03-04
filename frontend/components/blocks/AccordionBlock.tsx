import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import type { AccordionBlock as AccordionBlockType } from "@/type";
import { RichTextRenderer } from "./TextBlock";

export function AccordionBlock({ title, items }: AccordionBlockType) {
	return (
		<section className="w-full px-8 py-16">
			<div className="mx-auto max-w-3xl">
				{title && (
					<h2 className="mb-8 font-bold text-2xl text-zinc-900 dark:text-white">{title}</h2>
				)}
				<Accordion type="single" collapsible>
					{items.map((item) => (
						<AccordionItem key={item.id} value={String(item.id)}>
							<AccordionTrigger>{item.title}</AccordionTrigger>
							<AccordionContent>
								{item.content && item.content.length > 0 && (
									<RichTextRenderer nodes={item.content} />
								)}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
