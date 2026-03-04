import Link from "next/link";
import type { NavItem, StrapiImage } from "@/type";
import { NavLinks } from "./NavLinks";
import { NavMobileMenu } from "./NavMobileMenu";
import Image from "next/image";
import { getStrapiImageUrl } from "@/lib/strapi";

type Props = {
  siteName: string | null;
  logo: StrapiImage | null;
  items: NavItem[];
};

export function NavHeader({ siteName, items, logo }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex items-center justify-between px-10 py-4">
        <Link href="/" className="font-heading font-semibold text-lg">
          {logo && (
            <Image
              src={getStrapiImageUrl(logo.url)}
              alt={logo.alternativeText ?? siteName ?? "Logo"}
              width={logo.width}
              height={logo.height}
              className="inline-block mr-2 h-8 w-auto"
            />
          )}
          {!logo && siteName}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLinks items={items} variant="header" />
        </nav>

        <NavMobileMenu items={items} siteName={siteName} />
      </div>
    </header>
  );
}
