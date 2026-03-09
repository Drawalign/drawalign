import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { cn } from "@/lib/utils";
import type { SplitSection } from "@/type";

const bgMap = {
  primary: { bg: "bg-primary", text: "text-white", border: "border-white" },
  secondary: { bg: "bg-secondary", text: "text-white", border: "border-white" },
};

type Props = {
  items: SplitSection[];
};

export function ExpertisesItems({ items }: Props) {
  return (
    <Section>
      <div className="flex flex-col gap-5 md:px-5">
        {items.map((item, index) => {
          const style = bgMap[item.background ?? "primary"];
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.id}
              className={cn(
                "grid md:grid-cols-2 rounded-2xl overflow-hidden",
                style.bg,
                isEven ? "md:mr-[15%]" : "md:ml-[15%]",
              )}
            >
              {/* Image */}
              {item.image && (
                <div
                  className={cn(
                    "py-10",
                    isEven ? "md:pl-20" : "md:pr-20",
                    !isEven && "md:order-last",
                  )}
                >
                  <div className="relative min-h-60 md:h-full">
                    <StrapiImage
                      image={item.image}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
              {/* Contenu */}
              <div
                className={cn(
                  "flex flex-col gap-10 py-10 lg:py-16",
                  isEven ? "pr-10 lg:pr-20 pl-5" : "pl-10 lg:pl-20 pr-5",
                  style.text,
                )}
              >
                <div className="flex flex-col gap-6">
                  {item.title && (
                    <h2 className="text-3xl lg:text-4xl max-w-3xs tracking-tighter">
                      {item.title}
                    </h2>
                  )}
                  {item.description && (
                    <p className="text-sm lg:text-base tracking-[-4.5%]">
                      {item.description}
                    </p>
                  )}
                  {item.features && item.features.length > 0 && (
                    <ul className="flex flex-col gap-4">
                      {item.features.map((f) => (
                        <li
                          key={f.id}
                          className={cn(
                            "flex border-l px-5 font-medium items-start gap-2 text-sm",
                            style.border,
                          )}
                        >
                          {f.text.includes(":") ? (
                            <span>
                              <strong>{f.text.split(":")[0]}</strong>:
                              {f.text.split(":").slice(1).join(":")}
                            </span>
                          ) : (
                            <span>{f.text}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
