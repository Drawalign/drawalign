"use client";

import { RichTextRenderer } from "@/components/ui/RichTextRenderer";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { HomeHero as HomeHeroType } from "@/type";

type TriangleVariant = "bottom-left" | "right" | "top-left";

function BubbleBadge({
  text,
  triangle,
}: {
  text: string;
  triangle: TriangleVariant;
}) {
  return (
    <div className="relative w-fit">
      <span className="block whitespace-nowrap rounded-lg bg-secondary px-4 py-3 font-medium text-xs uppercase shadow">
        {text}
      </span>
      {triangle === "bottom-left" && (
        <svg
          className="absolute -bottom-3 left-1/2 fill-secondary"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          aria-hidden="true"
        >
          <polygon points="14,0 0,0 0,14" />
        </svg>
      )}
      {triangle === "right" && (
        <svg
          className="absolute right-1/2 -bottom-3 fill-secondary"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          aria-hidden="true"
        >
          <polygon points="0,0 14,0 14,14" />
        </svg>
      )}
      {triangle === "top-left" && (
        <svg
          className="absolute -top-3 left-1/2 fill-secondary"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          aria-hidden="true"
        >
          <polygon points="0,14 14,14 0,0" />
        </svg>
      )}
    </div>
  );
}

type BubblePosition = { top: string; left: string };

const BUBBLE_POSITIONS: BubblePosition[] = [
  { top: "15%", left: "48%" }, // bulle 0 : haut droite
  { top: "53%", left: "5%" }, // bulle 1 : milieu gauche
  { top: "87%", left: "32%" }, // bulle 2 : bas centre
];

const BUBBLE_POSITIONS_MOBILE: BubblePosition[] = [
  { top: "15%", left: "38%" }, // bulle 0
  { top: "42%", left: "2%" }, // bulle 1
  { top: "88%", left: "25%" }, // bulle 2
];

function getTriangleVariant(index: number, total: number): TriangleVariant {
  if (index === 0) return "bottom-left";
  if (index === total - 1) return "top-left";
  return "right";
}

export function HomeHero({
  eyebrow,
  title,
  text,
  image,
  bubbles,
}: HomeHeroType) {
  return (
    <section className="relative w-full overflow-hidden bg-primary text-white">
      <div className="px-6 py-8 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 xl:grid-cols-[7fr_5fr]">
          {/* Colonne gauche */}
          <div>
            {eyebrow && (
              <p className="mb-4 font-normal text-xl tracking-[-7%] md:text-2xl lg:text-lg xl:text-2xl">
                {eyebrow}
              </p>
            )}
            <h1 className="text-4xl tracking-tight lg:text-3xl xl:text-40">
              {title}
            </h1>
            {text && text.length > 0 && (
              <div className="mt-6 text-base xl:text-lg [&_p]:mb-0 [&_p]:leading-5">
                <RichTextRenderer nodes={text} />
              </div>
            )}
          </div>

          {/* Colonne droite */}
          {image && (
            <div className="relative aspect-533/409 md:mx-18 lg:mx-0">
              <StrapiImage image={image} fill className="object-contain" />
              {bubbles && bubbles.length > 0 && (
                <div className="absolute inset-0">
                  {bubbles.map((bubble, index) => {
                    const triangle = getTriangleVariant(index, bubbles.length);
                    return (
                      <>
                        {/* Mobile */}
                        <div
                          key={`${bubble.id}-mobile`}
                          className="absolute md:hidden"
                          style={{
                            top: BUBBLE_POSITIONS_MOBILE[index]?.top ?? "50%",
                            left: BUBBLE_POSITIONS_MOBILE[index]?.left ?? "0%",
                            transform: "translateY(-50%) scale(0.7)",
                            transformOrigin: "left center",
                          }}
                        >
                          <BubbleBadge text={bubble.text} triangle={triangle} />
                        </div>
                        {/* Desktop */}
                        <div
                          key={`${bubble.id}-desktop`}
                          className="absolute hidden md:block"
                          style={{
                            top: BUBBLE_POSITIONS[index]?.top ?? "50%",
                            left: BUBBLE_POSITIONS[index]?.left ?? "0%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <BubbleBadge text={bubble.text} triangle={triangle} />
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
