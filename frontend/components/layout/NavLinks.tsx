"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { isExternalUrl, sanitizeUrl } from "@/lib/url";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/type";

type Props = {
	items: NavItem[];
	variant: "header" | "sidebar";
	onNavigate?: () => void;
};

export function NavLinks({ items, variant, onNavigate }: Props) {
	const pathname = usePathname();
	const locale = useLocale();

	const linkClass =
		variant === "header"
			? "whitespace-nowrap font-medium transition-colors hover:text-primary md:text-sm lg:text-base xl:text-lg"
			: "rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-muted hover:text-muted-foreground lg:text-lg";

	return (
		<>
			{items.map((item) => {
				if (isExternalUrl(item.href)) {
					return (
						<a
							key={item.id}
							href={sanitizeUrl(item.href)}
							target="_blank"
							rel="noopener noreferrer"
							onClick={onNavigate}
							className={cn(linkClass, "text-foreground")}
						>
							{item.label}
						</a>
					);
				}

				const isActive = pathname === `/${item.href}`;
				return (
					<Link
						key={item.id}
						href={`/${item.href}` as Parameters<typeof Link>[0]["href"]}
						onClick={onNavigate}
						className={cn(linkClass, isActive ? "text-primary" : "text-foreground")}
					>
						{item.label}
					</Link>
				);
			})}

			{/* Locale switcher */}
			<span className={cn(linkClass, "flex items-center gap-1 text-muted-foreground")}>
				<Link
					href={pathname}
					locale="fr"
					onClick={onNavigate}
					className={cn(
						"transition-colors hover:text-primary",
						locale === "fr" ? "text-primary" : "",
					)}
				>
					FR
				</Link>
				<span className="opacity-30">|</span>
				<Link
					href={pathname}
					locale="en"
					onClick={onNavigate}
					className={cn(
						"transition-colors hover:text-primary",
						locale === "en" ? "text-primary" : "",
					)}
				>
					EN
				</Link>
			</span>
		</>
	);
}
