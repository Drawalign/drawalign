import { cn } from "@/lib/utils";
import type { CTABlock as CTABlockType } from "@/type";

function sanitizeUrl(url: string): string {
	try {
		const parsed = new URL(url);
		if (parsed.protocol === "javascript:") return "#";
		return url;
	} catch {
		if (url.startsWith("/") || url.startsWith("#")) return url;
		return "#";
	}
}

export function CTABlock({ buttonText, buttonLink, variant }: CTABlockType) {
	const btnClass = cn(
		"inline-flex items-center justify-center rounded-full px-6 py-3 font-heading font-medium transition-colors",
		(!variant || variant === "primary") &&
			"bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200",
		variant === "secondary" &&
			"bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700",
		variant === "outline" &&
			"border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-zinc-900",
		variant === "ghost" && "text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800",
	);

	const href = sanitizeUrl(buttonLink);
	const isExternal = href.startsWith("http");

	return (
		<section className="w-full px-8 py-20">
			<div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
				{buttonText && buttonLink && (
					<a
						href={href}
						className={btnClass}
						{...(isExternal && {
							target: "_blank",
							rel: "noopener noreferrer",
						})}
					>
						{buttonText}
					</a>
				)}
			</div>
		</section>
	);
}
