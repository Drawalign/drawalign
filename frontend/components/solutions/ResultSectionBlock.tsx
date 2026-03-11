import type { ResultSection } from "@/type";
import { Section } from "../ui/Section";

export function ResultSectionBlock({ title, items }: ResultSection) {
  if (!items || items.length === 0) return null;

  return (
    <Section variant="px80" className="w-full md:py-5">
      <div className="mx-auto max-w-9xl rounded-2xl bg-accent-peach p-10">
        {title && (
          <h2 className="mb-6 text-base tracking-tighter lg:text-xl">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 border-foreground border-l px-4"
            >
              <h3 className="font-medium text-lg">{item.title}</h3>
              {item.text && (
                <p className="text-sm leading-tight tracking-[-3.5%] lg:text-lg">
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
