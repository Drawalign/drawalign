import { ArrowRight } from "lucide-react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { BoldPrefixText } from "@/components/ui/BoldPrefixText";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { bgClass } from "@/lib/variants";
import type { ClientCase } from "@/type";

type Props = {
	items: ClientCase[];
	displayedIndex: number;
	fading: boolean;
	onSelect: (index: number) => void;
};

const badgeBg = {
	primary: "bg-primary text-white",
	secondary: "bg-secondary text-white",
	accent: "bg-accent text-foreground",
};

function NumberedSection({
	number,
	title,
	children,
}: {
	number: number;
	title: string;
	children?: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center gap-3">
				<div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary font-bold text-white text-xs">
					{number}
				</div>
				<h4 className="font-medium text-xl tracking-tight md:text-2xl">{title}</h4>
			</div>
			{children && <div className="ml-10 flex flex-col gap-6">{children}</div>}
		</div>
	);
}

function HighlightBox({
	label,
	text,
	variant = "secondary",
	className,
}: {
	label: string;
	text: string;
	variant?: "primary" | "secondary";
	className?: string;
}) {
	return (
		<div className={cn("ml-27 flex flex-col gap-2 rounded-xl p-5", bgClass[variant], className)}>
			<p className="font-medium text-white text-xs uppercase">{label}</p>
			<p className="whitespace-pre-line text-base text-white leading-normal">{text}</p>
		</div>
	);
}

function BoldPrefixList({
	items,
	bullet = true,
	prefixClassName,
	itemClassName = "text-muted-foreground",
}: {
	items: { id: number; text: string }[];
	bullet?: boolean;
	prefixClassName?: string;
	itemClassName?: string;
}) {
	return (
		<ul className={cn("flex flex-col gap-2", bullet && "list-disc pl-5 marker:text-primary")}>
			{items.map((item) => (
				<li key={item.id} className="text-sm">
					<BoldPrefixText
						text={item.text}
						prefixClassName={prefixClassName}
						bodyClassName={itemClassName}
					/>
				</li>
			))}
		</ul>
	);
}

export function ClientCaseDetails({ items, displayedIndex, fading, onSelect }: Props) {
	const item = items[displayedIndex];

	return (
		<Section id="case-details" className="flex flex-col gap-10 lg:px-37">
			<div
				className={cn(
					"flex flex-col gap-10 rounded-2xl bg-accent-peach p-8 transition-opacity duration-200 lg:p-15",
					fading ? "opacity-0" : "opacity-100",
				)}
			>
				{/* Header : chip + titre, fond blanc */}
				<div className="flex flex-col gap-4">
					{item.title && (
						<span
							className={cn(
								"self-start rounded-lg px-5 py-2 font-medium text-sm",
								badgeBg[item.background],
							)}
						>
							{item.short_title}
						</span>
					)}
					<h3 className="text-2xl leading-tight tracking-tighter lg:text-32">{item.title}</h3>
				</div>

				{/* 1. Le contexte */}
				<NumberedSection number={1} title="Le contexte">
					{item.context_text && (
						<p className="whitespace-pre-line text-muted-foreground text-sm leading-normal">
							{item.context_text}
						</p>
					)}
					{item.context_items && item.context_items.length > 0 && (
						<BoldPrefixList items={item.context_items} prefixClassName="font-normal" />
					)}
				</NumberedSection>

				{/* 2. Le problème */}
				<NumberedSection number={2} title="Le problème : la dilution de l'identité">
					{item.problem_text && (
						<p className="whitespace-pre-line text-muted-foreground text-sm">{item.problem_text}</p>
					)}
					{item.problem_consequence && (
						<HighlightBox label="Conséquence" variant="secondary" text={item.problem_consequence} />
					)}
				</NumberedSection>

				{/* 3. La solution */}
				<NumberedSection number={3} title="La solution DRAW ALIGN">
					{item.solution_cycle_name && (
						<p className="font-medium text-foreground text-lg">{item.solution_cycle_name}</p>
					)}
					{item.solution_steps && item.solution_steps.length > 0 && (
						<div className="flex flex-col gap-5">
							{item.solution_steps.map((step) => (
								<div key={step.id} className="flex gap-3">
									<span
										className={cn(
											"shrink-0 self-start rounded-sm px-4 py-2 font-bold text-xs",
											badgeBg[step.badge_variant ?? "primary"],
										)}
									>
										{step.badge_label}
									</span>
									<div className="flex flex-col gap-2">
										{step.title && <span className="font-medium text-sm">{step.title}</span>}
										{step.items && step.items.length > 0 && (
											<BoldPrefixList
												items={step.items}
												bullet={false}
												prefixClassName="text-primary font-medium"
											/>
										)}
										{step.revelation && (
											<HighlightBox
												label="Révélation"
												text={step.revelation}
												variant="secondary"
												className="ml-0"
											/>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</NumberedSection>

				{/* 4. Les résultats */}
				<NumberedSection
					number={4}
					title={`Les résultats mesurés${item.roi ? ` (ROI ${item.roi})` : ""}`}
				>
					{item.results_metrics && item.results_metrics.length > 0 && (
						<ul className="flex flex-col gap-3">
							{item.results_metrics.map((m) => (
								<li key={m.id} className="flex gap-1">
									<span className="text-base text-foreground">{m.label}</span>
									<span className="flex items-center gap-1 text-base">
										{m.before && <span className="text-muted-foreground">{m.before}</span>}
										{m.before && (
											<ArrowRight size={14} className="shrink-0 text-muted-foreground" />
										)}
										<span className="text-primary">{m.after}</span>
									</span>
								</li>
							))}
						</ul>
					)}
					{item.results_benefit && (
						<div className="flex flex-col gap-4">
							<p className="font-medium text-lg">Bénéfice concret :</p>
							<p className="whitespace-pre-line text-base text-muted-foreground leading-normal">
								{item.results_benefit}
							</p>
						</div>
					)}
					{item.results_feedback && (
						<HighlightBox label="Feedback client" text={item.results_feedback} variant="primary" />
					)}
				</NumberedSection>
			</div>

			{/* Thumbnails */}
			{items.length > 1 && (
				<div className="flex flex-col gap-6">
					<h4 className="text-2xl tracking-tight">Découvrir d&apos;autres cas clients</h4>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
						{items
							.filter((_, i) => i !== displayedIndex)
							.map((other) => {
								const originalIndex = items.indexOf(other);
								return (
									<button
										type="button"
										key={other.id}
										onClick={() => onSelect(originalIndex)}
										className="flex flex-col gap-3 rounded-2xl border border-light-gray p-6 text-left transition-colors duration-300 hover:border-primary"
									>
										{other.short_title && (
											<span
												className={cn(
													"self-start rounded-lg px-4 py-2 font-medium text-xs",
													badgeBg[other.background],
												)}
											>
												{other.short_title}
											</span>
										)}

										{other.thumbnail_text && (
											<p className="text-muted-foreground text-sm leading-normal">
												{other.thumbnail_text}
											</p>
										)}
										<span className="mt-auto flex items-center gap-1 font-medium text-primary text-sm">
											Découvrir ce cas <ArrowIcon />
										</span>
									</button>
								);
							})}
					</div>
				</div>
			)}
		</Section>
	);
}
