type Props = { text: string; prefixClassName?: string; bodyClassName?: string };

export function BoldPrefixText({ text, prefixClassName, bodyClassName }: Props) {
	if (!text.includes(":")) return <span className={bodyClassName}>{text}</span>;
	const [prefix, ...rest] = text.split(":");
	return (
		<span>
			<strong className={prefixClassName}>{prefix}</strong>
			<span
				className={`whitespace-pre-line${bodyClassName ? ` ${bodyClassName}` : ""}`}
			>{`:${rest.join(":")}`}</span>
		</span>
	);
}
