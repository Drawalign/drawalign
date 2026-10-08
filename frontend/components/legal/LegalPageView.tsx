import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { Section } from "@/components/ui/Section";
import type { LegalPage } from "@/type";

export function LegalPageView({ page }: { page: LegalPage | null }) {
	if (!page) notFound();

	return (
		<main>
			{page.hero?.title && (
				<PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} subtitle={page.hero.text} />
			)}
			{page.content?.length ? (
				<Section variant="lg">
					<RichTextRenderer nodes={page.content} />
				</Section>
			) : null}
		</main>
	);
}
