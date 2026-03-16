"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
	const [pending, setPending] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setPending(true);
		// TODO: wire up submission
		setPending(false);
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="grid grid-cols-1 gap-4 text-[#140D4A99]">
				<input
					name="lastName"
					placeholder="Nom"
					required
					className="rounded-lg bg-white px-4 py-3 outline-none focus:bg-white"
				/>
				<input
					name="firstName"
					placeholder="Prénom"
					required
					className="rounded-lg bg-white px-4 py-3 outline-none focus:bg-white"
				/>
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					className="rounded-lg bg-white px-4 py-3 outline-none focus:bg-white"
				/>
				<textarea
					name="message"
					placeholder="Message"
					required
					rows={5}
					className="resize-none rounded-lg bg-white outline-nonefocus:bg-white px-4 py-3"
				/>
			</div>
			<div>
				<Button type="submit" variant="foreground" size="sm" disabled={pending}>
					{pending ? "Envoi…" : "Envoyer"}
				</Button>
			</div>
		</form>
	);
}
