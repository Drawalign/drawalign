import Link from "next/link";
import { getLocale } from "next-intl/server";
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
						<Link href={`/ressources/${article.slug}`} className="mt-auto self-start">
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
							<div className="flex flex-col p-6">
								<h3 className="text-lg leading-tight lg:text-32">{article.title}</h3>
								<Link href={`/ressources/${article.slug}`} className="mt-auto self-start">
									<span className="flex items-center gap-2 text-black/55 text-sm tracking-tight lg:text-lg">
										Lire l&apos;article
									</span>
								</Link>
							</div>
						</Link>
					</Card>
				))}
			</div>
		</Section>
	);
}
