import Link from "next/link";
import { getLocale } from "next-intl/server";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { getArticles } from "@/lib/strapi";

export async function ArticleListBlock() {
	const locale = await getLocale();
	const articles = await getArticles(locale);

	if (!articles.length) return null;

	return (
		<Section variant="md">
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{articles.map((article) => (
					<Card key={article.id} noPadding hover>
						{article.coverImage && (
							<div className="relative aspect-video w-full overflow-hidden">
								<StrapiImage
									image={article.coverImage}
									alt={article.title}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<div className="flex flex-col gap-3 p-6">
							<h3 className="font-medium text-lg leading-tight">{article.title}</h3>
							<Link href={`/ressources/${article.slug}`} className="mt-auto self-start">
								<span className="flex items-center gap-2 font-medium text-sm">
									Lire l&apos;article <ArrowIcon />
								</span>
							</Link>
						</div>
					</Card>
				))}
			</div>
		</Section>
	);
}
