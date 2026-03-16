import { Button } from "@/components/ui/button";
import { StrapiImage } from "@/components/ui/StrapiImage";
import type { TeamMember } from "@/type";

export function TeamMemberCard({ name, function: role, text, image, cta }: TeamMember) {
	return (
		<div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-accent-peach p-5 md:grid-cols-[280px_1fr] lg:p-20">
			{image && (
				<div className="relative min-h-64 overflow-hidden rounded-2xl">
					<StrapiImage image={image} fill className="object-cover" />
				</div>
			)}
			<div className="flex flex-col gap-6 p-8 lg:p-10">
				<div>
					<h3 className="text-32 tracking-tight">{name}</h3>
					{role && <p className="text-primary text-sm lg:text-2xl">{role}</p>}
				</div>
				{text && <p className="text-sm leading-none lg:text-2xl">{text}</p>}
				{cta && (
					<div className="mt-auto">
						<Button href={cta.href} variant="foreground" size="sm" arrow>
							{cta.label}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
