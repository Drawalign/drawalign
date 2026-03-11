import { BoldPrefixText } from "@/components/ui/BoldPrefixText";
import { cn } from "@/lib/utils";
import type { ListItem } from "@/type";

type Props = {
	items: ListItem[];
	className?: string;
};

export function FeatureList({ items, className }: Props) {
	return (
		<ul className="flex flex-col gap-4">
			{items.map((f) => (
				<li key={f.id} className={cn("border-white border-l px-5", className)}>
					<BoldPrefixText text={f.text} />
				</li>
			))}
		</ul>
	);
}
