"use client";

export default function ErrorPage({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-4 px-8">
			<h2 className="font-bold text-2xl">Something went wrong</h2>
			<button
				type="button"
				onClick={reset}
				className="rounded-full bg-zinc-900 px-6 py-3 font-medium text-sm text-white transition-colors hover:bg-zinc-700"
			>
				Try again
			</button>
		</main>
	);
}
