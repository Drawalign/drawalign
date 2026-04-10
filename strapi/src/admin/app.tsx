import React from "react";

const getLocale = () =>
  new URLSearchParams(window.location.search).get("plugins[i18n][locale]") || "fr";

const LocaleBanner = () => {
  const [locale, setLocale] = React.useState(getLocale);

  React.useEffect(() => {
    const update = () => setLocale(getLocale());

    window.addEventListener("popstate", update);

    const originalPushState = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
      originalPushState(...args);
      update();
    };

    return () => {
      window.removeEventListener("popstate", update);
      window.history.pushState = originalPushState;
    };
  }, []);

  if (locale === "fr") return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        background: "#e07b20",
        color: "white",
        padding: "8px 18px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      🌐 EN
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
          primary100: "#ECEAFF",
          primary200: "#C4BCFF",
          primary500: "#6450FF",
          primary600: "#6450FF",
          primary700: "#140D4A",
          buttonNeutral0: "#ffffff",
          buttonPrimary500: "#6450FF",
          buttonPrimary600: "#140D4A",
        },
      },
    },
  },

  bootstrap(app: { getPlugin: (name: string) => { injectComponent: (zone: string, area: string, config: { name: string; Component: React.ComponentType }) => void } }) {
    app
      .getPlugin("content-manager")
      .injectComponent("editView", "right-links", {
        name: "locale-banner",
        Component: LocaleBanner,
      });
  },
};
