"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { NavItem } from "@/type";
import { NavLinks } from "./NavLinks";

type Props = {
	items: NavItem[];
	siteName: string | null;
};

export function NavMobileMenu({ items, siteName }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<div className="md:hidden">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
				className="p-2"
			>
				{open ? <X className="size-5" /> : <Menu className="size-5" />}
			</button>

			{open && (
				<div className="fixed inset-0 z-50 flex flex-col bg-background">
					<div className="flex items-center justify-between border-b px-6 py-4">
						<span className="font-heading font-medium text-lg">{siteName ?? "Menu"}</span>
						<button
							type="button"
							onClick={() => setOpen(false)}
							aria-label="Fermer le menu"
							className="p-2"
						>
							<X className="size-5" />
						</button>
					</div>
					<nav className="flex flex-col gap-1 p-6">
						<NavLinks items={items} variant="sidebar" onNavigate={() => setOpen(false)} />
					</nav>
				</div>
			)}
		</div>
	);
}
