"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { SiteLink } from "@/components/ui/SiteLink";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/type";

type Props = {
	items: NavItem[];
	variant: "header" | "sidebar";
	onNavigate?: () => void;
};

export function NavLinks({ items, variant, onNavigate }: Props) {
	const pathname = usePathname();
	const params = useParams();
	const locale = useLocale();

	const linkClass =
		variant === "header"
			? "whitespace-nowrap font-medium transition-colors hover:text-primary md:text-sm lg:text-base xl:text-lg"
			: "rounded-md px-3 py-2 font-medium text-sm transition-colors hover:bg-muted hover:text-muted-foreground lg:text-lg";

	return (
		<>
			{items.map((item) => {
				const isActive = pathname === `/${item.href}`;
				return (
					<SiteLink
						key={item.id}
						href={item.href}
						onClick={onNavigate}
						className={cn(linkClass, isActive ? "text-primary" : "text-foreground")}
					>
						{item.label}
					</SiteLink>
				);
			})}

			{/* Locale switcher */}
			<span className={cn(linkClass, "flex items-center gap-1 text-muted-foreground")}>
				<Link
					// @ts-expect-error -- params are only valid with the dynamic pathname; next-intl resolves both at runtime
					href={{ pathname, params }}
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
					// @ts-expect-error -- params are only valid with the dynamic pathname; next-intl resolves both at runtime
					href={{ pathname, params }}
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
