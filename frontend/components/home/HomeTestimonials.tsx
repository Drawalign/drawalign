"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TestimonialsSection } from "@/type";

gsap.registerPlugin(ScrollTrigger);

export function HomeTestimonials({
  title,
  eyebrow,
  items,
}: TestimonialsSection) {
  const triggerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [centered, setCentered] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const trigger = triggerRef.current;
      const track = trackRef.current;
      if (!trigger || !track) return;

      if (track.scrollWidth <= window.innerWidth) {
        setCentered(true);
        return;
      }

      const RIGHT_PAD = 64;
      const totalScroll = track.scrollWidth - window.innerWidth + RIGHT_PAD;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger,
          pin: true,
          scrub: 1,
          start: "top 10%",
          end: `+=${totalScroll}`,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={triggerRef} className="py-16 md:overflow-hidden">
      {(title || eyebrow) && (
        <div className="px-5 max-w-9xl mx-auto mb-12">
          <SectionHeader title={title ?? ""} eyebrow={eyebrow} />
        </div>
      )}
      <div className="relative">
        <div className="md:hidden absolute right-0 top-0 bottom-0 w-24 pointer-events-none z-10" />
        <div
          ref={trackRef}
          className={cn("flex gap-8 px-5 md:px-16 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none", centered && "md:justify-center")}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col gap-6 flex-none w-[calc((100vw-52px)/1.15)] sm:w-[55vw] md:w-80"
            >
              <p className="text-base leading-5 text-foreground">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="text-base leading-5 font-medium text-foreground">
                  {item.author}
                </p>
                {item.role && (
                  <p className="text-[15px] leading-5 text-muted-foreground">
                    {item.role}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
