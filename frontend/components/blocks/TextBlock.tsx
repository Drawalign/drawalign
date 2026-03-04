import { cn } from "@/lib/utils";
import type { RichTextNode, TextBlock as TextBlockType } from "@/type";

function sanitizeUrl(url: string | undefined): string {
	if (!url) return "#";
	try {
		const parsed = new URL(url);
		if (parsed.protocol === "javascript:") return "#";
		return url;
	} catch {
		if (url.startsWith("/") || url.startsWith("#")) return url;
		return "#";
	}
}

export function RichTextRenderer({ nodes }: { nodes: RichTextNode[] }) {
	return (
		<>
			{nodes.map((node, i) => {
				if (node.type === "text") {
					let content: React.ReactNode = node.text ?? "";
					if (node.bold) content = <strong>{content}</strong>;
					if (node.italic) content = <em>{content}</em>;
					if (node.underline) content = <u>{content}</u>;
					if (node.strikethrough) content = <s>{content}</s>;
					if (node.code)
						content = (
							<code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-sm dark:bg-zinc-800">
								{content}
							</code>
						);
					return <span key={i}>{content}</span>;
				}

				const children = node.children ? <RichTextRenderer key={i} nodes={node.children} /> : null;

				switch (node.type) {
					case "paragraph":
						return (
							<p key={i} className="mb-4 leading-7">
								{children}
							</p>
						);
					case "heading":
						return (
							<Heading key={i} level={node.level ?? 1}>
								{children}
							</Heading>
						);
					case "list":
						return node.format === "ordered" ? (
							<ol key={i} className="mb-4 list-decimal pl-6 leading-7">
								{children}
							</ol>
						) : (
							<ul key={i} className="mb-4 list-disc pl-6 leading-7">
								{children}
							</ul>
						);
					case "list-item":
						return <li key={i}>{children}</li>;
					case "link": {
						const href = sanitizeUrl(node.url);
						const isExternal = href.startsWith("http");
						return (
							<a
								key={i}
								href={href}
								className="underline underline-offset-2"
								{...(isExternal && {
									target: "_blank",
									rel: "noopener noreferrer",
								})}
							>
								{children}
							</a>
						);
					}
					case "quote":
						return (
							<blockquote
								key={i}
								className="mb-4 border-zinc-300 border-l-4 pl-4 text-zinc-600 italic dark:border-zinc-600 dark:text-zinc-400"
							>
								{children}
							</blockquote>
						);
					case "code":
						return (
							<pre
								key={i}
								className="mb-4 overflow-x-auto rounded-lg bg-zinc-100 p-4 font-mono text-sm dark:bg-zinc-900"
							>
								{children}
							</pre>
						);
					default:
						return <span key={i}>{children}</span>;
				}
			})}
		</>
	);
}

function Heading({ level, children }: { level: number; children: React.ReactNode }) {
	const classes = cn(
		"mb-4 font-bold tracking-tight",
		level === 1 && "text-4xl",
		level === 2 && "text-3xl",
		level === 3 && "text-2xl",
		level === 4 && "text-xl",
		level === 5 && "text-lg",
		level === 6 && "text-base",
	);
	const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
	return <Tag className={classes}>{children}</Tag>;
}

export function TextBlock({ content }: TextBlockType) {
	if (!content?.length) return null;
	return (
		<section className="mx-auto w-full max-w-7xl px-8 py-12">
			<div className="prose dark:prose-invert max-w-none">
				<RichTextRenderer nodes={content} />
			</div>
		</section>
	);
}
