import Link from "next/link";
import type { NavItem, StrapiImage as StrapiImageType } from "@/type";
import { NavLinks } from "./NavLinks";
import { NavMobileMenu } from "./NavMobileMenu";
import { StrapiImage } from "@/components/ui/StrapiImage";

type Props = {
  siteName: string | null;
  logo: StrapiImageType | null;
  items: NavItem[];
};

export function NavHeader({ siteName, items, logo }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex items-center justify-between px-10 py-4">
        <Link href="/" className="font-heading font-semibold text-lg">
          {logo && (
            <StrapiImage
              image={logo}
              alt={logo.alternativeText ?? siteName ?? "Logo"}
              className="inline-block mr-2 h-8 w-auto"
            />
          )}
          {!logo && siteName}
        </Link>

        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          <NavLinks items={items} variant="header" />
        </nav>

        <NavMobileMenu items={items} siteName={siteName} />
      </div>
    </header>
  );
}
