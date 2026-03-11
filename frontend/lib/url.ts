export function sanitizeUrl(url: string | undefined): string {
	if (!url) return "#";
	try {
		const parsed = new URL(url);
		if (parsed.protocol === "javascript:") return "#";
		return url;
	} catch {
		if (url.startsWith("/") || url.startsWith("#")) return url;
		return "#";
	}
}

export function isExternalUrl(url: string): boolean {
	return url.startsWith("http");
}
