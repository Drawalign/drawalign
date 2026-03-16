import { Section } from "@/components/ui/Section";
import type { HowItWorksSteps } from "@/type";

export function HowItWorksStepsBlock({ title, steps }: HowItWorksSteps) {
	if (!steps || steps.length === 0) return null;

	return (
		<Section variant="lg" className="md:pb-5">
			{title && <h2 className="mb-10 text-3xl tracking-tighter lg:text-4xl">{title}</h2>}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				{steps.map((step, index) => (
					<div key={step.id} className="flex h-fit flex-col gap-5 border-light-gray border-l p-8">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary font-medium text-sm text-white">
							{index + 1}
						</div>
						<h3 className="text-xl tracking-tighter">{step.title}</h3>
						{step.items && step.items.length > 0 && (
							<ol className="flex list-disc flex-col gap-3">
								{step.items.map((item) => (
									<li key={item.id} className="pl-4 text-sm">
										{item.text}
									</li>
								))}
							</ol>
						)}
					</div>
				))}
			</div>
		</Section>
	);
}
