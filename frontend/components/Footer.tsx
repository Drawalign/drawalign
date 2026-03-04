import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { getStrapiImageUrl } from "@/lib/strapi";
import type { FooterData, NavItem } from "@/type";

const SOCIAL_ICONS = {
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  github: FaGithub,
  instagram: FaInstagram,
  facebook: FaFacebook,
  youtube: FaYoutube,
} as const;

type Props = {
  footer: FooterData | null;
  siteName: string | null;
  sitemapItems: NavItem[];
};

export function Footer({ footer, siteName, sitemapItems }: Props) {
  const name = siteName || "My Site";
  const hasContent =
    footer &&
    (footer.logo ||
      footer.tagline ||
      footer.address ||
      sitemapItems.length ||
      footer.legalLinks?.length ||
      footer.socialLinks?.length);

  return (
    <footer className="border-t bg-foreground text-white">
      <div className="mx-auto px-6 lg:px-10 py-12">
        {hasContent && (
          <div className="mb-8 grid gap-12 md:grid-cols-[5fr_3fr_3fr]">
            {/* Col 1 : Branding + Socials */}
            <div className="space-y-4">
              <div className="space-y-3">
                {footer.logo ? (
                  <Image
                    src={getStrapiImageUrl(footer.logo.url)}
                    alt={footer.logo.alternativeText || name}
                    width={footer.logo.width}
                    height={footer.logo.height}
                    className="h-8 w-auto"
                  />
                ) : (
                  <span className="font-heading font-semibold text-lg">
                    {name}
                  </span>
                )}
                {footer.tagline && (
                  <p className="text-white text-sm">{footer.tagline}</p>
                )}
                {footer.address && (
                  <address className="whitespace-pre-line text-white text-sm not-italic">
                    {footer.address}
                  </address>
                )}
              </div>
              {footer.socialLinks?.length ? (
                <div className="flex flex-wrap gap-4">
                  {footer.socialLinks.map((social) => {
                    const Icon = SOCIAL_ICONS[social.platform];
                    return Icon ? (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="text-white transition-colors hover:text-muted-foreground"
                      >
                        <Icon size={20} />
                      </a>
                    ) : null;
                  })}
                </div>
              ) : null}
            </div>

            {/* Col 2 : Sitemap */}
            {sitemapItems.length ? (
              <nav className="space-y-2">
                {sitemapItems.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="block text-white text-sm transition-colors hover:text-muted-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ) : (
              <div />
            )}

            {/* Col 3 : Mentions légales */}
            {footer.legalLinks?.length ? (
              <nav className="space-y-2">
                {footer.legalLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="block text-white text-sm transition-colors hover:text-muted-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
