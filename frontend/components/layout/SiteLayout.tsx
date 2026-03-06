import { getAllPages, getGlobal } from "@/lib/strapi";
import type { NavItem } from "@/type";
import { CtaBanner } from "./CtaBanner";
import { Footer } from "./Footer";
import { NavHeader } from "./NavHeader";
import { NavSidebar } from "./NavSidebar";

export async function SiteLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [global, pages] = await Promise.all([
    getGlobal(locale),
    getAllPages(locale),
  ]);

  if (!global) {
    return <>{children}</>;
  }

  const { siteName, navVariant, logo, ctaBanner } = global;

  const navItems: NavItem[] = global.navItems?.length
    ? global.navItems
    : pages.map((page) => ({
        id: page.id,
        label: page.title,
        href: `/${page.slug}`,
      }));

  if (navVariant === "sidebar") {
    return (
      <div className="flex min-h-screen">
        <NavSidebar siteName={siteName} items={navItems} />
        <div className="flex flex-1 flex-col md:ml-64">
          <main className="flex-1 lg:max-w-9xl lg:mx-auto">{children}</main>
          {ctaBanner && <CtaBanner text={ctaBanner.text} cta={ctaBanner.cta} />}
          <Footer
            footer={global.footer}
            siteName={siteName}
            sitemapItems={navItems}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <NavHeader siteName={siteName} logo={logo} items={navItems} />
      <main className="flex-1">{children}</main>
      {ctaBanner && <CtaBanner text={ctaBanner.text} cta={ctaBanner.cta} />}
      <Footer
        footer={global.footer}
        siteName={siteName}
        sitemapItems={navItems}
      />
    </div>
  );
}
