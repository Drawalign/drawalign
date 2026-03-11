import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
	text: string;
	cta: {
		buttonText: string;
		buttonLink: string;
	} | null;
	className?: string;
};

export function CtaBanner({ text, cta, className }: Props) {
	return (
		<section className={cn("w-full bg-primary text-white", className)}>
			<div className="mx-auto flex max-w-9xl flex-col items-center gap-8 px-5 py-16 text-center md:py-24">
				<h2 className="text-4xl tracking-tight md:text-6xl">{text}</h2>
				{cta && (
					<Button href={cta.buttonLink} variant="foreground" arrow>
						{cta.buttonText}
					</Button>
				)}
			</div>
		</section>
	);
}
