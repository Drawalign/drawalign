import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
	default: ({
		href,
		children,
		onClick,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
		<a href={href} onClick={onClick} {...props}>
			{children}
		</a>
	),
}));

import { NavLinks } from "@/components/layout/NavLinks";

const items = [
	{ id: 1, label: "Page A", href: "/page-a" },
	{ id: 2, label: "Page B", href: "/page-b" },
];

describe("NavLinks", () => {
	it("calls onNavigate when a link is clicked", async () => {
		const onNavigate = vi.fn();
		render(<NavLinks items={items} variant="sidebar" onNavigate={onNavigate} />);
		await userEvent.click(screen.getByRole("link", { name: "Page A" }));
		expect(onNavigate).toHaveBeenCalledOnce();
	});
});
