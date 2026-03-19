import { BoldPrefixText } from "@/components/ui/BoldPrefixText";
import { cn } from "@/lib/utils";
import type { ListItem } from "@/type";

type Props = {
	items: ListItem[];
	variant?: "default" | "noBorder";
	className?: string;
};

export function FeatureList({ items, variant = "default", className }: Props) {
	return (
		<ul className="flex flex-col gap-4">
			{items.map((f) => (
				<li
					key={f.id}
					className={cn(
						variant === "default" && "border-white border-l px-5 leading-tight",
						className,
					)}
				>
					<BoldPrefixText text={f.text} />
				</li>
			))}
		</ul>
	);
}
