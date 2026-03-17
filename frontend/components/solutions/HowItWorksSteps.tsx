import { BoldPrefixText } from "@/components/ui/BoldPrefixText";
import { Section } from "@/components/ui/Section";
import type { HowItWorksSteps as HowItWorksStepsType } from "@/type";

export function HowItWorksSteps({ title, steps }: HowItWorksStepsType) {
  if (!steps || steps.length === 0) return null;

  return (
    <Section variant="lg" className="md:pb-5">
      {title && (
        <h2 className="mb-10 text-3xl tracking-tighter lg:text-4xl">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-[auto_auto_1fr]">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="grid grid-rows-subgrid gap-x-0 gap-y-5 border-light-gray border-l p-8 md:row-span-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary font-medium text-base text-white">
              {index + 1}
            </div>
            <h3 className="text-2xl tracking-tighter">{step.title}</h3>
            {step.items && step.items.length > 0 && (
              <ol className="flex list-disc flex-col gap-3">
                {step.items.map((item) => (
                  <li
                    key={item.id}
                    className="pl-4 text-sm lg:text-[19px] leading-tight"
                  >
                    <BoldPrefixText text={item.text} prefixClassName="font-medium" />
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
