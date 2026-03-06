import Link from "next/link";

export function PreviewBanner() {
	return (
		<div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between border-t bg-yellow-50 px-6 py-3 font-medium text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
			<span>Preview mode — Viewing draft content</span>
			<Link
				href="/api/disable-draft"
				className="rounded border border-yellow-400 px-3 py-1 hover:bg-yellow-100 dark:border-yellow-600 dark:hover:bg-yellow-900/50"
			>
				Exit preview
			</Link>
		</div>
	);
}
