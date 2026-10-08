import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { isExternalUrl, sanitizeUrl } from "@/lib/url";

type Props = Omit<ComponentProps<"a">, "href" | "ref"> & { href: string };

// Strapi hrefs are saved without a leading "/" ("contact"); left relative they resolve
// against the current path and break on nested pages such as /ressources/<slug>.
export function SiteLink({ href, children, ...rest }: Props) {
	if (isExternalUrl(href)) {
		return (
			<a href={sanitizeUrl(href)} target="_blank" rel="noopener noreferrer" {...rest}>
				{children}
			</a>
		);
	}

	const internal = href.startsWith("/") ? href : `/${href}`;
	return (
		<Link href={internal as Parameters<typeof Link>[0]["href"]} {...rest}>
			{children}
		</Link>
	);
}
