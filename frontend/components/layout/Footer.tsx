import Link from "next/link";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { StrapiImage } from "@/components/ui/StrapiImage";
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
    <footer className="bg-foreground text-white">
      <div className="mx-auto px-6 py-12 lg:px-10">
        {hasContent && (
          <div className="grid gap-12 md:grid-cols-[5fr_3fr_3fr] xl:gap-18">
            {/* Col 1 : Branding + Socials */}
            <div className="space-y-12">
              <div className="space-y-3">
                {footer.logo ? (
                  <StrapiImage
                    image={footer.logo}
                    alt={footer.logo.alternativeText || name}
                    className="h-8 w-auto"
                  />
                ) : (
                  <span className="font-heading font-medium text-lg">
                    {name}
                  </span>
                )}
                {footer.tagline && (
                  <p className="text-sm text-white">{footer.tagline}</p>
                )}
                {footer.address && (
                  <address className="whitespace-pre-line text-sm text-white not-italic">
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
                    className="block text-sm text-white transition-colors hover:text-muted-foreground"
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
                    className="block text-sm text-white transition-colors hover:text-muted-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div />
                {footer.logo_esf && (
                  <StrapiImage
                    image={footer.logo_esf}
                    alt={footer.logo_esf?.alternativeText || name}
                    className="h-8 w-auto"
                  />
                )}
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
