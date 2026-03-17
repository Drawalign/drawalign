import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { cn } from "@/lib/utils";
import { bgClass } from "@/lib/variants";
import type {
  ConvictionItem,
  CtaLink,
  DiagramCard,
  StrapiImage as StrapiImageType,
} from "@/type";

type Props = {
  logo_hldb: StrapiImageType | null;
  left: DiagramCard | null;
  right: DiagramCard | null;
  principles_title: string | null;
  principles_items: ConvictionItem[] | null;
  theoretical_title: string | null;
  theoretical_items: ConvictionItem[] | null;
  section3_cta: CtaLink | null;
};

function DiagramCardBlock({ card }: { card: DiagramCard }) {
  return (
    <div
      className={cn(
        "xl-p-8 flex max-w-77.5 flex-col gap-4 rounded-2xl p-5 text-white",
        bgClass[card.background],
      )}
    >
      <div className="flex flex-col gap-3">
        <p className="font-medium text-[19px] leading-tight">{card.title}</p>
        {card.subtitle && (
          <p className="text-[#E9E9E9] text-sm leading-tight tracking-tight lg:text-lg">
            {card.subtitle}
          </p>
        )}
        {card.subtitle && <hr className="border-white/40" />}
      </div>
      {card.text && (
        <p className="whitespace-pre-line text-[10px] leading-normal">
          {card.text}
        </p>
      )}
    </div>
  );
}

function ItemList({ items }: { items: ConvictionItem[] }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.id} className="border-foreground border-l px-5">
          <p className="text-base leading-tight lg:text-lg">
            <span className="font-medium">{item.title}</span>
            {item.text && ` : ${item.text}`}
          </p>
        </div>
      ))}
    </div>
  );
}

export function MethodePrincipes({
  logo_hldb,
  left,
  right,
  principles_title,
  principles_items,
  theoretical_title,
  theoretical_items,
  section3_cta,
}: Props) {
  if (
    !left &&
    !right &&
    !logo_hldb &&
    !principles_items?.length &&
    !theoretical_items?.length
  )
    return null;

  return (
    <Section variant="lg" className="flex flex-col gap-10 pb-12 md:pb-20">
      {(left || right || logo_hldb) && (
        <div className="relative grid grid-cols-1 items-center gap-3 pt-3 lg:grid-cols-[1fr_auto_1fr]">
          {/* ligne horizontale desktop */}
          <div className="absolute inset-0 z-0 m-auto hidden h-px w-80 -translate-y-1/2 bg-primary lg:block lg:w-113.5" />
          {/* ligne verticale mobile/tablet */}
          <div className="absolute top-[10%] bottom-[10%] left-1/2 z-0 w-px -translate-x-1/2 bg-primary lg:hidden" />
          <div className="relative z-10 flex justify-center lg:justify-end">
            {left && <DiagramCardBlock card={left} />}
          </div>
          <div className="relative mx-auto flex aspect-square w-64 items-center justify-center lg:w-107.5">
            <Image
              src="/methode/circle.svg"
              alt=""
              fill
              className="absolute inset-0"
              aria-hidden="true"
            />
            <div className="absolute" style={{ width: "70%", height: "70%" }}>
              <Image
                src="/methode/circle2.svg"
                alt=""
                fill
                aria-hidden="true"
              />
            </div>
            <Image
              src="/methode/circle-inside1.svg"
              alt=""
              width={56}
              height={56}
              className="absolute"
              style={{ top: "12%", right: "6%" }}
              aria-hidden="true"
            />
            <Image
              src="/methode/circle-inside2.svg"
              alt=""
              width={38}
              height={38}
              className="absolute"
              style={{ bottom: "16%", left: "5%" }}
              aria-hidden="true"
            />
            {logo_hldb && (
              <div className="relative z-10 aspect-square w-[48%]">
                <StrapiImage
                  image={logo_hldb}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
          <div className="relative z-10 flex justify-center lg:block">
            {right && <DiagramCardBlock card={right} />}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {principles_items?.length ? (
            <Card variant="light" className="flex flex-col gap-8">
              {principles_title && (
                <h2 className="font-medium text-xl uppercase md:text-3xl">
                  {principles_title}
                </h2>
              )}
              <ItemList items={principles_items} />
            </Card>
          ) : null}

          {theoretical_items?.length ? (
            <Card variant="light" className="flex flex-col gap-8">
              {theoretical_title && (
                <h2 className="font-medium text-xl uppercase md:text-3xl">
                  {theoretical_title}
                </h2>
              )}
              <ItemList items={theoretical_items} />
            </Card>
          ) : null}
        </div>

        {section3_cta && (
          <div className="flex justify-center">
            <Button href={section3_cta.href} arrow>
              {section3_cta.label}
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
