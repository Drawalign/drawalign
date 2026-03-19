import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "@/components/contact/ContactForm";

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
	await user.type(screen.getByPlaceholderText("Nom"), "Dupont");
	await user.type(screen.getByPlaceholderText("Prénom"), "Alice");
	await user.type(screen.getByPlaceholderText("Email"), "alice@example.com");
	await user.type(screen.getByPlaceholderText("Message"), "Bonjour");
}

describe("ContactForm", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it("affiche le message de succès après envoi réussi", async () => {
		const user = userEvent.setup();
		vi.spyOn(global, "fetch").mockResolvedValue(
			new Response(JSON.stringify({ success: true }), { status: 200 }),
		);

		render(<ContactForm />);
		await fillForm(user);
		await user.click(screen.getByRole("button", { name: /envoyer/i }));

		await waitFor(() => {
			expect(screen.getByText(/votre message a bien été envoyé/i)).toBeInTheDocument();
		});
	});

	it("affiche le message d'erreur retourné par l'API", async () => {
		const user = userEvent.setup();
		vi.spyOn(global, "fetch").mockResolvedValue(
			new Response(JSON.stringify({ error: "Une erreur est survenue." }), { status: 500 }),
		);

		render(<ContactForm />);
		await fillForm(user);
		await user.click(screen.getByRole("button", { name: /envoyer/i }));

		await waitFor(() => {
			expect(screen.getByText(/une erreur est survenue/i)).toBeInTheDocument();
		});
	});

	it("désactive le bouton pendant l'envoi", async () => {
		const user = userEvent.setup();
		let resolve!: (v: Response) => void;
		vi.spyOn(global, "fetch").mockReturnValue(
			new Promise<Response>((r) => {
				resolve = r;
			}),
		);

		render(<ContactForm />);
		await fillForm(user);
		await user.click(screen.getByRole("button", { name: /envoyer/i }));

		await waitFor(() => {
			expect(screen.getByRole("button")).toBeDisabled();
		});

		resolve(new Response(JSON.stringify({ success: true }), { status: 200 }));
	});
});
