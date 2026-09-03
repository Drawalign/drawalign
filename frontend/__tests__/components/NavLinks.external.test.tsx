import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useLocale: () => "fr" }));
vi.mock("@/i18n/navigation", () => ({
	usePathname: () => "/",
	Link: ({ href, children, onClick, ...props }: any) => (
		<a href={href} onClick={onClick} {...props}>
			{children}
		</a>
	),
}));

import { NavLinks } from "@/components/layout/NavLinks";

const items = [
	{ id: 1, label: "Page A", href: "page-a" },
	{ id: 2, label: "External", href: "https://example.com" },
];

describe("NavLinks external", () => {
	it("renders external link without nested anchors", () => {
		render(<NavLinks items={items as any} variant="header" />);
		const link = screen.getByRole("link", { name: "External" });
		expect(link.tagName).toBe("A");
		expect(link.closest("a a")).toBeNull();
	});
});
