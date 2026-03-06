"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { RichTextRenderer } from "@/components/blocks/TextBlock";
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
      <span className="block rounded-lg uppercase bg-secondary px-4 py-3 font-medium text-xs shadow whitespace-nowrap">
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
          className="absolute -bottom-3 right-1/2 fill-secondary"
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
  { top: "15%", left: "28%" }, // bulle 0
  { top: "50%", left: "2%" }, // bulle 1
  { top: "85%", left: "8%" }, // bulle 2
];

// Chaque bulle a sa propre amplitude et inertie
const BUBBLE_PARALLAX = [
  { factor: 1.4, duration: 0.18 },
  { factor: 0.7, duration: 0.28 },
  { factor: 1.1, duration: 0.22 },
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
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [leaving, setLeaving] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 767px)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const bubblePositions = isMobile ? BUBBLE_POSITIONS_MOBILE : BUBBLE_POSITIONS;

  useEffect(() => {
    function handleOrientation(e: DeviceOrientationEvent) {
      setLeaving(false);
      setOffset({
        x: Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30)),
        y: Math.max(-1, Math.min(1, (e.beta ?? 0) / 30)),
      });
    }
    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setLeaving(false);
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
      y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
    });
  }

  function handleMouseLeave() {
    setLeaving(true);
    setOffset({ x: 0, y: 0 });
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary text-white w-full overflow-hidden px-6 py-8 md:px-10 md:py-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Bordure extérieure complète du ring (union Path1 + Path2) */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="hero-clip" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.001877, 0.002445)"
              d="M388.276 0C561.911 96.3721 573.318 297.984 451.957 394.474C439.496 392.538 427.049 390.588 414.666 388.636C407.62 395.831 399.989 402.64 391.777 409C221.472 383.223 53.598 355.467 4.22368 339.481C-0.179893 338.056 -1.32551 333.501 1.66802 330.376C31.1307 299.624 169.371 156.001 324.902 5.42285C337.639 12.3094 349.544 19.7222 360.628 27.5859C369.765 18.4345 378.988 9.2305 388.276 0Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 xl:grid-cols-[7fr_5fr]">
        {/* Colonne gauche */}
        <div>
          {eyebrow && (
            <p className="mb-4 font-normal text-xl md:text-2xl lg:text-lg xl:text-2xl tracking-[-7%]">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl tracking-tight lg:text-3xl xl:text-[40px]">
            {title}
          </h1>
          {text && text.length > 0 && (
            <div className="mt-6 text-base xl:text-lg [&_p]:leading-5 [&_p]:mb-0">
              <RichTextRenderer nodes={text} />
            </div>
          )}
        </div>

        {/* Colonne droite */}
        {image && (
          <div className="relative md:mx-18 lg:mx-0 aspect-533/409">
            {/* Photo clippée — couche arrière, bouge moins */}
            <StrapiImage
              image={image}
              className="relative w-full h-full object-cover"
              style={{ clipPath: "url(#hero-clip)" }}
              fetchPriority="high"
            />
            {/* Ring — statique, aligné avec la photo */}
            <Image
              src="/shapes/hero.svg"
              alt=""
              aria-hidden={true}
              width={533}
              height={409}
              className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            />
            {/* Bulles — flottent au-dessus avec le curseur */}
            {bubbles && bubbles.length > 0 && (
              <div className="absolute inset-0">
                {bubbles.map((bubble, index) => {
                  const p = BUBBLE_PARALLAX[index] ?? {
                    factor: 1,
                    duration: 0.2,
                  };
                  const tx = -offset.x * 7 * p.factor;
                  const ty = -offset.y * 5 * p.factor;
                  const t = leaving
                    ? `transform ${p.duration * 4}s ease-out`
                    : `transform ${p.duration}s ease-out`;
                  return (
                    <div
                      key={bubble.id}
                      className="absolute"
                      style={{
                        top: bubblePositions[index]?.top ?? "50%",
                        left: bubblePositions[index]?.left ?? "0%",
                        transform: `translateY(-50%) translate(${tx}px, ${ty}px)`,
                        transition: t,
                      }}
                    >
                      <div
                        style={
                          isMobile
                            ? { transform: "scale(0.7)", transformOrigin: "left center" }
                            : undefined
                        }
                      >
                        <BubbleBadge
                          text={bubble.text}
                          triangle={getTriangleVariant(index, bubbles.length)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
