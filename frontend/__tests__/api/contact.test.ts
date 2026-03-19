import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

const mockSend = vi.fn();

vi.mock("resend", () => ({
	Resend: vi.fn().mockImplementation(() => ({
		emails: { send: mockSend },
	})),
}));

function makeRequest(body: unknown) {
	return new Request("http://localhost/api/contact", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
}

describe("POST /api/contact", () => {
	beforeEach(() => {
		mockSend.mockReset();
	});

	it("retourne 400 si un champ est manquant", async () => {
		const res = await POST(
			makeRequest({ firstName: "Alice", email: "a@a.com", message: "Bonjour" }),
		);
		expect(res.status).toBe(400);
		const body = await res.json();
		expect(body.error).toBe("Champs manquants");
	});

	it("retourne 400 si le body est vide", async () => {
		const res = await POST(makeRequest({}));
		expect(res.status).toBe(400);
	});

	it("retourne 500 si Resend échoue", async () => {
		mockSend.mockResolvedValue({ error: { message: "Resend down" } });
		const res = await POST(
			makeRequest({ firstName: "Alice", lastName: "Dupont", email: "a@a.com", message: "Bonjour" }),
		);
		expect(res.status).toBe(500);
		const body = await res.json();
		expect(body.error).toBe("Resend down");
	});

	it("retourne 200 si l'envoi réussit", async () => {
		mockSend.mockResolvedValue({ error: null });
		const res = await POST(
			makeRequest({ firstName: "Alice", lastName: "Dupont", email: "a@a.com", message: "Bonjour" }),
		);
		expect(res.status).toBe(200);
		const body = await res.json();
		expect(body.success).toBe(true);
	});
});
