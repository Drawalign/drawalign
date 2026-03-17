"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { StrapiImage } from "@/components/ui/StrapiImage";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import type { NavItem, StrapiImage as StrapiImageType } from "@/type";
import { NavLinks } from "./NavLinks";

type Props = {
	items: NavItem[];
	siteName: string | null;
	logo?: StrapiImageType | null;
};

export function NavMobileMenu({ items, siteName, logo }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<div className="md:hidden">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<button type="button" aria-label="Ouvrir le menu" className="p-2">
						<Menu className="size-5" />
					</button>
				</SheetTrigger>

				<SheetContent side="right" className="w-full p-0 sm:max-w-xs">
					<SheetHeader className="border-b px-6 py-4">
						<SheetTitle asChild>
							<Link href="/" className="font-heading text-lg">
								{logo ? (
									<StrapiImage
										image={logo}
										alt={logo.alternativeText ?? siteName ?? "Logo"}
										className="h-8 w-auto"
									/>
								) : (
									(siteName ?? "Menu")
								)}
							</Link>
						</SheetTitle>
					</SheetHeader>
					<nav className="flex flex-col gap-1 p-6">
						<NavLinks items={items} variant="sidebar" onNavigate={() => setOpen(false)} />
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	);
}
