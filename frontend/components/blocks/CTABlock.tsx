import { Button } from "@/components/ui/button";
import type { CTABlock as CTABlockType } from "@/type";

export function CTABlock({ buttonText, buttonLink, variant }: CTABlockType) {
	if (!buttonText || !buttonLink) return null;

	return (
		<section className="w-full px-8 py-20">
			<div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
				<Button href={buttonLink} variant={variant ?? "primary"}>
					{buttonText}
				</Button>
			</div>
		</section>
	);
}
