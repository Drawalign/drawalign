"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { LogosSection } from "@/type";

export function HomeLogos({ title, logos }: LogosSection) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [marquee, setMarquee] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      setMarquee(inner.offsetWidth > outer.clientWidth);
    });
  }, [logos]);

  if (!logos || logos.length === 0) return null;

  const logoItems = logos.map((logo, i) => (
    <StrapiImage
      key={i}
      image={logo}
      className="h-12 w-auto object-contain flex-none"
    />
  ));

  return (
    <Section>
      {title && (
        <p className="mb-8 text-center text-lg text-foreground">{title}</p>
      )}

      {/* Mesure : outer = largeur du container, inner = largeur naturelle des logos */}
      <div
        ref={outerRef}
        style={{ height: 0, overflow: "hidden", width: "100%" }}
        aria-hidden
      >
        <div
          ref={innerRef}
          style={{ display: "flex", gap: "3rem", width: "max-content" }}
        >
          {logoItems}
        </div>
      </div>

      {marquee ? (
        <div className="-mx-5 overflow-hidden">
          <div
            style={{
              display: "flex",
              gap: "3rem",
              alignItems: "center",
              width: "max-content",
              animation: "marquee 30s linear infinite",
            }}
          >
            {logoItems}
            {logos.map((logo, i) => (
              <StrapiImage
                key={`dup-${i}`}
                image={logo}
                className="h-12 w-auto object-contain flex-none"
                aria-hidden
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-12">
          {logoItems}
        </div>
      )}
    </Section>
  );
}
