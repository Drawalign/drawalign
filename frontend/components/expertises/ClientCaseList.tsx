"use client";

import { Fragment } from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { Button } from "@/components/ui/button";
import { FeatureList } from "@/components/ui/FeatureList";
import { Section } from "@/components/ui/Section";
import { StaggerGrid } from "@/components/ui/StaggerGrid";
import { cn } from "@/lib/utils";
import { bgClass } from "@/lib/variants";
import type { ClientCase } from "@/type";

type Props = {
	items: ClientCase[];
	onSelect?: (index: number) => void;
};

export function ClientCaseList({ items, onSelect }: Props) {
	return (
		<Section variant="full" className="bg-accent-peach pt-0">
			<StaggerGrid className="grid grid-cols-1 gap-5 md:grid-cols-2">
				{items.map((item, index) => (
					<Fragment key={item.id}>
						{/* Colored card */}
						<BentoCard
							className={cn(
								"flex flex-col gap-8 rounded-2xl p-8 lg:p-15",
								bgClass[item.background],
							)}
							style={{ animationDelay: `${index * 2 * 300}ms` }}
						>
							<h3 className="text-3xl text-white tracking-tighter lg:text-40">
								{item.short_title ?? item.title}
							</h3>
							{item.features && item.features.length > 0 && (
								<FeatureList items={item.features} className="text-white" />
							)}
							<div className="mt-auto">
								<Button onClick={() => onSelect?.(index)} variant="foreground" arrow>
									Voir le cas client
								</Button>
							</div>
						</BentoCard>

						{/* White card */}
						<BentoCard
							className="flex flex-col gap-8 rounded-2xl bg-white p-8 lg:p-12"
							style={{ animationDelay: `${(index * 2 + 1) * 300}ms` }}
						>
							{item.objectives && item.objectives.length > 0 && (
								<div className="flex flex-col gap-6">
									<h4 className="text-2xl">Objectifs</h4>
									<ul className="flex list-disc flex-col pl-5">
										{item.objectives.map((o) => (
											<li key={o.id} className="text-sm leading-tight lg:text-[15px]">
												{o.text}
											</li>
										))}
									</ul>
								</div>
							)}
							{item.tags && item.tags.length > 0 && (
								<div className="flex flex-col gap-6">
									<h4 className="text-2xl">Enjeux</h4>
									<div className="flex flex-wrap gap-2">
										{item.tags.map((t) => (
											<span
												key={t.id}
												className="rounded-lg bg-foreground px-4 py-2 font-bold text-background text-base"
											>
												{t.label}
											</span>
										))}
									</div>
								</div>
							)}
						</BentoCard>
					</Fragment>
				))}
			</StaggerGrid>
		</Section>
	);
}
