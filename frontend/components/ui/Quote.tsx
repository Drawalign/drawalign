type Props = {
	text: string;
	author: string;
	role?: string | null;
};

export function Quote({ text, author, role }: Props) {
	return (
		<blockquote className="flex flex-col gap-6">
			<p className="text-xl leading-none tracking-tighter lg:text-32">{text}</p>
			<footer>
				<p className="font-medium text-lg">{author}</p>
				{role && <p className="text-muted-foreground text-sm">{role}</p>}
			</footer>
		</blockquote>
	);
}
