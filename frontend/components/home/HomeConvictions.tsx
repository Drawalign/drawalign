import type { ConvictionsSection } from "@/type";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function HomeConvictions({ eyebrow, title, items }: ConvictionsSection) {
  return (
    <section className="px-5 md:px-18 lg:px-38 py-16 md:py-24 max-w-9xl mx-auto">
      <div className="mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} className="mb-12" />

        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-8 lg:p-15 flex items-center bg-secondary-light rounded-2xl flex-col gap-4 md:gap-6 lg:gap-10"
            >
              <h3 className="text-base md:text-2xl lg:text-3xl 2xl:text-4xl text-center font-normal tracking-[-5%] uppercase">
                {item.title}
              </h3>
              {item.text && (
                <p className="text-sm lg:text-base 2xl:text-xl text-foreground text-center leading-none">
                  {item.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
