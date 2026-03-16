import { Link } from "@/i18n/navigation";
import type { NavItem } from "@/type";
import { NavLinks } from "./NavLinks";
import { NavMobileMenu } from "./NavMobileMenu";

type Props = {
	siteName: string | null;
	items: NavItem[];
};

export function NavSidebar({ siteName, items }: Props) {
	return (
		<>
			{/* Desktop sidebar */}
			<aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-background md:flex">
				<div className="border-b px-6 py-4">
					<Link href="/" className="font-heading font-medium text-lg">
						{siteName ?? "My Site"}
					</Link>
				</div>
				<nav className="flex flex-1 flex-col gap-1 p-4">
					<NavLinks items={items} variant="sidebar" />
				</nav>
			</aside>

			{/* Mobile: hamburger button fixed top-left */}
			<div className="fixed top-4 left-4 z-50 md:hidden">
				<NavMobileMenu items={items} siteName={siteName} />
			</div>
		</>
	);
}
