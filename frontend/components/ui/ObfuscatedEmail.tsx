"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type BaseProps = {
	/** base64 of the real address — never the plain email, so it's not scrapable in the SSR HTML */
	encoded: string;
	className?: string;
};

type AnchorProps = BaseProps & { asButton?: false };

type ButtonModeProps = BaseProps & {
	asButton: true;
	label: string;
	variant?: "primary" | "secondary" | "white" | "foreground";
	size?: "sm" | "md";
	arrow?: boolean;
};

type ObfuscatedEmailProps = AnchorProps | ButtonModeProps;

export function ObfuscatedEmail(props: ObfuscatedEmailProps) {
	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		setEmail(atob(props.encoded));
	}, [props.encoded]);

	if (props.asButton) {
		const { label, variant, size, arrow, className } = props;
		return email ? (
			<Button href={`mailto:${email}`} variant={variant} size={size} arrow={arrow} className={className}>
				{label}
			</Button>
		) : (
			<Button variant={variant} size={size} arrow={arrow} className={className} disabled>
				{label}
			</Button>
		);
	}

	const { className } = props;
	return email ? (
		<a href={`mailto:${email}`} className={className}>
			{email}
		</a>
	) : (
		<span className={className} aria-hidden>
			••••••••••••••
		</span>
	);
}
