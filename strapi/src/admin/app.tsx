import { useState, useEffect } from "react";

const HOME_UID = "api::home.home";

const TABS = [
  { id: "seo", label: "SEO" },
  { id: "hero", label: "Héro" },
  { id: "expertises", label: "Expertises" },
  { id: "fullWidthImage", label: "Image" },
  { id: "quoteSection", label: "Citation" },
  { id: "convictions", label: "Convictions" },
  { id: "solutions", label: "Solutions" },
  { id: "testimonials", label: "Témoignages" },
  { id: "logos", label: "Logos" },
  { id: "ctaFinal", label: "CTA final" },
];

const normalizeText = (text: string) =>
  text.toLowerCase().replace(/[\s_-]/g, "");

const scrollToField = (fieldId: string) => {
  // Strapi renders a <label> for each component field whose text is
  // the camelCase field name converted to "Sentence case with spaces".
  // We normalize both sides to compare reliably:
  // e.g. fieldId "quoteSection" → "quotesection"
  //      label text "Quote section" → "quotesection"
  const needle = normalizeText(fieldId);

  const labels = document.querySelectorAll("label");
  for (const label of labels) {
    const text = label.textContent?.trim() ?? "";
    if (normalizeText(text) === needle) {
      // Scroll to the label's nearest scrollable ancestor section
      const target =
        label.closest('[class*="Box"], [class*="Field"], section') ?? label;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }
};

const HomeTabsNav = ({ slug }: { slug: string }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slug !== HOME_UID) return;

    const observers: IntersectionObserver[] = [];

    const setup = () => {
      TABS.forEach((tab, i) => {
        const needle = normalizeText(tab.id);
        let target: Element | null = null;

        for (const label of document.querySelectorAll("label")) {
          if (normalizeText(label.textContent?.trim() ?? "") === needle) {
            target =
              label.closest('[class*="Box"], [class*="Field"], section') ??
              label;
            break;
          }
        }

        if (!target) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActive(i);
          },
          { rootMargin: "-10% 0px -50% 0px" },
        );
        observer.observe(target);
        observers.push(observer);
      });
    };

    // Attendre que le formulaire Strapi soit rendu
    const timer = setTimeout(setup, 800);
    return () => {
      clearTimeout(timer);
      observers.forEach((o) => o.disconnect());
    };
  }, [slug]);

  if (slug !== HOME_UID) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "56px",
        zIndex: 100,
        background: "#212134",
        border: "1px solid #212134",
        borderRadius: "16px",
        padding: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        minWidth: "140px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          color: "#7b79ff",
          margin: "0 0 6px",
        }}
      >
        Sections
      </p>
      {TABS.map((tab, i) => {
        const isActive = active === i;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActive(i);
              scrollToField(tab.id);
            }}
            style={{
              display: "block",
              width: "100%",
              padding: "5px 8px",
              borderRadius: "4px",
              border: "none",
              background: isActive ? "#f0f0ff" : "transparent",
              color: isActive ? "#4945ff" : "#f0f0ff",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: isActive ? 600 : 400,
              textAlign: "left",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default {
  config: {
    locales: ["fr"],

    auth: {
      logo: "/uploads/logo.png",
    },

    menu: {
      logo: "/uploads/logo.png",
    },

    head: {
      favicon: "/uploads/logo.png",
    },

    theme: {
      light: {
        colors: {
          primary600: "#0066CC",
          primary700: "#0052A3",
        },
      },
    },
  },

  bootstrap(app: any) {
    app
      .getPlugin("content-manager")
      .injectComponent("editView", "right-links", {
        name: "home-tabs-nav",
        Component: HomeTabsNav,
      });
  },
};
